import { NextResponse } from 'next/server';
import { ApiResponse, PaginatedResponse } from '@backend/types/database.types';

export function successResponse<T>(data: T, status = 200) {
  const body: ApiResponse<T> = {
    success: true,
    data,
  };
  return NextResponse.json(body, { status });
}

export function paginatedResponse<T>(
  items: T[],
  meta: { page: number; limit: number; total: number },
  status = 200
) {
  const totalPages = Math.ceil(meta.total / meta.limit);
  const body: PaginatedResponse<T> = {
    success: true,
    data: items,
    meta: {
      page: meta.page,
      limit: meta.limit,
      total: meta.total,
      totalPages: totalPages || 1,
    },
  };
  return NextResponse.json(body, { status });
}

export function errorResponse(
  message: string,
  code = 'INTERNAL_ERROR',
  status = 500,
  details?: unknown
) {
  const body: ApiResponse = {
    success: false,
    error: {
      code,
      message,
      ...(details ? { details } : {}),
    },
  };
  return NextResponse.json(body, { status });
}
