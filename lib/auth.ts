import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export interface AuthSuccess {
  userId: string;
  email: string;
}

export interface AuthFailure {
  error: string;
}

export type AuthResult = AuthSuccess | AuthFailure;

/**
 * Verifies the JWT token from the NextRequest Authorization header.
 * 
 * @param req NextRequest
 * @returns Object indicating success containing userId and email, or an error payload.
 */
export async function verifyAuth(req: NextRequest): Promise<AuthResult> {
  try {
    const authHeader = req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { error: 'Unauthorized' };
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return { error: 'Unauthorized' };
    }

    // Attempt to verify jsonwebtoken decoding
    const decoded = jwt.verify(token, jwtSecret) as { userId: string; email: string };

    return {
      userId: decoded.userId,
      email: decoded.email,
    };
  } catch (err) {
    // Catch-all mapping to Unauthorized per requirements
    return { error: 'Unauthorized' };
  }
}
