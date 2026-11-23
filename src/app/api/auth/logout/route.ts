import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME } from '@backend/services/admin/admin-auth.service';
import { successResponse } from '@backend/utils/api-response';

export async function POST() {
  const response = successResponse({ message: 'Logged out successfully' });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: '',
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
  return response;
}
