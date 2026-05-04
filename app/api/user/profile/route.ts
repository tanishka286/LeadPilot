import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const authResult = await verifyAuth(req);
    if ('error' in authResult || !authResult.userId) {
      return NextResponse.json(
        { error: true, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const user = await User.findById(authResult.userId).select('name email phone');
    if (!user) {
      return NextResponse.json(
        { error: true, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
      phone: user.phone ?? '',
    });
  } catch (error) {
    console.error('Profile GET error:', error);
    return NextResponse.json(
      { error: true, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authResult = await verifyAuth(req);
    if ('error' in authResult || !authResult.userId) {
      return NextResponse.json(
        { error: true, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, phone } = body;

    if (typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: true, message: 'Name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    if (phone !== undefined && phone !== null && typeof phone !== 'string') {
      return NextResponse.json(
        { error: true, message: 'Phone must be a string' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const update: { name: string; phone?: string } = { name: name.trim() };
    if (typeof phone === 'string') {
      update.phone = phone.trim();
    }

    await User.findByIdAndUpdate(authResult.userId, { $set: update });

    const updated = await User.findById(authResult.userId).select('name email phone');
    if (!updated) {
      return NextResponse.json(
        { error: true, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      name: updated.name,
      email: updated.email,
      phone: updated.phone ?? '',
    });
  } catch (error) {
    console.error('Profile PUT error:', error);
    return NextResponse.json(
      { error: true, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
