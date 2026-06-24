import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Both email & password are requried.",
        },
        { status: 400 },
      );
    }

    await connectDB();

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({
        message: `User with email:${email} already exists`,
      });
    }

    await User.create({
      email,
      password,
    });

    return NextResponse.json(
      {
        message: "User registered successfully.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    throw new Error("User Registration Failure error.");
  }
}
