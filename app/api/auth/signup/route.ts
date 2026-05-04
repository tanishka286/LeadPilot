import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import { sendEmail } from '@/lib/email';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, phone } = body;

    if (phone !== undefined && phone !== null && typeof phone !== 'string') {
      return NextResponse.json(
        { error: true, message: 'Phone must be a string' },
        { status: 400 }
      );
    }

    // Validate inputs
    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: true, message: 'Name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: true, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: true, message: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    // Connect to MongoDB
    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: true, message: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user in the database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      ...(typeof phone === 'string' && phone.trim() !== ''
        ? { phone: phone.trim() }
        : {}),
    });

    const welcomeBody = `Hi ${newUser.name},

Welcome to LeadPilot.

LeadPilot helps you manage leads and follow-ups using a simple daily action system.

Here's how it works:

* Add your leads
* Set follow-up dates
* Get daily tasks
* Complete actions and build your streak

Open LeadPilot and start managing your leads.

— LeadPilot`;

    try {
      await sendEmail(
        newUser.email,
        'Welcome to LeadPilot 🚀',
        welcomeBody
      );
    } catch (err) {
      console.error("Welcome email failed:", err);
    }

    // Return the specific structure
    return NextResponse.json(
      {
        userId: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json(
      { error: true, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
