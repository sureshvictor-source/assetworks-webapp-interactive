import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import User from '@/lib/db/models/User';
import { hashPassword } from '@/lib/auth/password';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({
      email: email.toLowerCase()
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      aiCredits: 100, // Free credits for new users
      credits: 100,
      plan: 'free',
    });

    await user.save();

    // Return user data without password
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      aiCredits: user.aiCredits,
      credits: user.credits,
      plan: user.plan
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        user: userData
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);

    // Return detailed error in development, generic in production
    const errorMessage = process.env.NODE_ENV === 'development'
      ? error instanceof Error ? error.message : 'Unknown error'
      : 'Failed to create account';

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
        ...(process.env.NODE_ENV === 'development' && {
          error: error instanceof Error ? error.stack : String(error)
        })
      },
      { status: 500 }
    );
  }
}