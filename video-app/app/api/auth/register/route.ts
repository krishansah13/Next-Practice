import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password }  = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }
    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "User Already Registered",
        },
        { status: 400 },
      );
    }

    await User.create({ email, password });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error(`Registration error :  ${error}`);
    return NextResponse.json(
      {
        error: "User registration failed",
      },
      {
        status: 500,
      },
    );
  }
}

/* get Data from frontEnd
 * Validation
 * 1. existing user check
 * 2. create user in DB
 * 3. return success response
 */
