import bcrypt from "bcryptjs";
import { connect } from "@/utils/db";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { ObjectId } from "mongodb";

export async function POST(request) {
  try {
    const { username, password,phone,email,bio } = await request.json();
    const hashPassword = await bcrypt.hash(password, 10);
    await connect();

    await User.create({ username,email,phone,bio, password: hashPassword });

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
export const fetchUserById = async (id) => {
  try {
    await connect();
    const user = User.findOne({ _id: new ObjectId(id) });
    return user;
  } catch (error) {
    console.log(error);
  }
};