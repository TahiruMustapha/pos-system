import bcrypt from "bcryptjs";
import { connect } from "@/utils/db";
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const hashPassword = await bcrypt.hash(password, 10);
    await connect();

    await User.create({ username, password: hashPassword });

    return NextResponse.json({ message: "User registered!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error occured while registering the user!" },
      {
        status: 500,
      }
    );
  }
}
