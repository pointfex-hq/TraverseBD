import { NextRequest, NextResponse } from 'next/server';
import { adminLogin, demoSuperAdminLogin, ADMIN_COOKIE_NAME } from '@backend/services/admin/admin-auth.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, isDemo } = body;

    if (isDemo) {
      const demoResult = demoSuperAdminLogin();
      const response = successResponse({
        user: demoResult.user,
        token: demoResult.token,
      });

      // Set HTTP-Only Cookie
      response.cookies.set({
        name: ADMIN_COOKIE_NAME,
        value: demoResult.token,
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'lax',
      });

      return response;
    }

    if (!email) {
      return errorResponse('Email address is required', 'VALIDATION_ERROR', 400);
    }

    const result = await adminLogin(email, password);
    if (!result) {
      return errorResponse('Invalid email or password', 'UNAUTHORIZED', 401);
    }

    const response = successResponse({
      user: result.user,
      token: result.token,
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: result.token,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
    });

    return response;
  } catch (err: any) {
    return errorResponse(err.message || 'Login failed', 'INTERNAL_ERROR', 500);
  }
}
