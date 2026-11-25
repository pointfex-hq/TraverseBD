import crypto from 'crypto';

export const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10 Megabytes

export const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
];

export interface UploadResult {
  url: string;
  public_id: string;
  bytes: number;
  format: string;
  width?: number;
  height?: number;
  provider: 'cloudinary' | 'local';
  notice?: string;
}

/**
 * Validates image size (max 10MB) and MIME type
 */
export function validateImage(sizeBytes: number, mimeType: string): void {
  if (sizeBytes > MAX_IMAGE_SIZE_BYTES) {
    const sizeInMB = (sizeBytes / (1024 * 1024)).toFixed(1);
    throw new Error(
      `File size (${sizeInMB}MB) exceeds the maximum allowed limit of 10MB.`
    );
  }

  if (!ALLOWED_IMAGE_MIME_TYPES.includes(mimeType.toLowerCase())) {
    throw new Error(
      `Unsupported file format (${mimeType}). Allowed formats: JPEG, PNG, WEBP, AVIF, GIF.`
    );
  }
}

/**
 * Generates Cloudinary SHA-1 signature
 */
function generateSignature(paramsToSign: Record<string, any>, apiSecret: string): string {
  const sortedKeys = Object.keys(paramsToSign).sort();
  const serialized = sortedKeys.map((key) => `${key}=${paramsToSign[key]}`).join('&');
  return crypto.createHash('sha1').update(`${serialized}${apiSecret}`).digest('hex');
}

/**
 * Uploads an image to Cloudinary if credentials exist, otherwise falls back gracefully
 */
export async function uploadImageBuffer(
  buffer: Buffer,
  filename: string,
  mimeType: string,
  folder = 'traversebd'
): Promise<UploadResult> {
  // 1. Strict Size & Type Validation
  validateImage(buffer.length, mimeType);

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET?.trim();

  // 2. If Cloudinary is configured, upload to Cloudinary CDN
  if (cloudName && (uploadPreset || (apiKey && apiSecret))) {
    const timestamp = Math.floor(Date.now() / 1000);
    const formData = new FormData();

    const base64Data = `data:${mimeType};base64,${buffer.toString('base64')}`;
    formData.append('file', base64Data);

    if (uploadPreset) {
      formData.append('upload_preset', uploadPreset);
    } else if (apiKey && apiSecret) {
      const paramsToSign = {
        folder,
        timestamp,
      };
      const signature = generateSignature(paramsToSign, apiSecret);
      formData.append('api_key', apiKey);
      formData.append('timestamp', String(timestamp));
      formData.append('folder', folder);
      formData.append('signature', signature);
    }

    const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error?.message || 'Failed to upload image to Cloudinary');
    }

    return {
      url: data.secure_url || data.url,
      public_id: data.public_id,
      bytes: data.bytes || buffer.length,
      format: data.format || mimeType.split('/')[1] || 'jpg',
      width: data.width,
      height: data.height,
      provider: 'cloudinary',
    };
  }

  // 3. Fallback: Base64 / Local preview until admin provides Cloudinary credentials in .env
  const base64Url = `data:${mimeType};base64,${buffer.toString('base64')}`;
  const ext = mimeType.split('/')[1] || 'jpg';
  const public_id = `local_${Date.now()}_${filename.replace(/[^\w]/g, '_')}`;

  return {
    url: base64Url,
    public_id,
    bytes: buffer.length,
    format: ext,
    provider: 'local',
    notice: 'Uploaded locally. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env for live Cloudinary storage.',
  };
}

/**
 * Deletes an image from Cloudinary
 */
export async function deleteImageFromCloudinary(publicId: string): Promise<boolean> {
  if (!publicId || publicId.startsWith('local_')) {
    return true;
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

  if (!cloudName || !apiKey || !apiSecret) {
    return true; // No keys to delete from
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const paramsToSign = {
    public_id: publicId,
    timestamp,
  };
  const signature = generateSignature(paramsToSign, apiSecret);

  const formData = new FormData();
  formData.append('public_id', publicId);
  formData.append('api_key', apiKey);
  formData.append('timestamp', String(timestamp));
  formData.append('signature', signature);

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;
  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  return response.ok && (data.result === 'ok' || data.result === 'not found');
}
