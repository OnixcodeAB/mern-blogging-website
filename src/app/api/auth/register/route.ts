import users from "@/utils/schema/User";
import dbConnect from "@/utils/mongodb/db";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { fullname, email, password } = await request.json();
  await dbConnect();

  const hashedPassword = await bcryptjs.hash(password, 5);

  const newUser = new users({
    personal_info: {
      fullname,
      email,
      password: hashedPassword,
    },
  });
  try {
    await newUser.save();
    return new NextResponse("User Has been created", { status: 201 });
  } catch (err: any) {
    console.log(err);
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
