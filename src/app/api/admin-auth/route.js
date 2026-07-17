import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = 'RajShiv@1949';

export async function POST(request) {
  try {
    const { password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return Response.json({ success: false, error: 'Wrong password' }, { status: 401 });
    }

    const token = Buffer.from(ADMIN_PASSWORD).toString('base64');

    const response = NextResponse.json({ success: true });

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return response;

  } catch (error) {
    return Response.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}