import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = 'RajShiv@1949';
const failedAttempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 30 * 60 * 1000;

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();

    if (failedAttempts.has(ip)) {
      const data = failedAttempts.get(ip);

      if (data.count >= MAX_ATTEMPTS) {
        const timeLeft = Math.ceil((data.lastAttempt + LOCKOUT_TIME - now) / 60000);

        if (now - data.lastAttempt < LOCKOUT_TIME) {
          return Response.json({
            success: false,
            error: `Too many failed attempts. Try again in ${timeLeft} minutes.`
          }, { status: 429 });
        } else {
          failedAttempts.delete(ip);
        }
      }
    }

    const { password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      const existing = failedAttempts.get(ip) || { count: 0, lastAttempt: now };
      failedAttempts.set(ip, {
        count: existing.count + 1,
        lastAttempt: now,
      });

      const attemptsLeft = MAX_ATTEMPTS - (existing.count + 1);

      return Response.json({
        success: false,
        error: attemptsLeft > 0
          ? `Wrong password. ${attemptsLeft} attempts remaining.`
          : 'Too many failed attempts. Locked out for 30 minutes.'
      }, { status: 401 });
    }

    failedAttempts.delete(ip);

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