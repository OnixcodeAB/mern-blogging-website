import users from "@/utils/schema/User";
import dbConnect from "@/utils/mongodb/db";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse,  } from "next/server";
import { nanoid } from "nanoid";

export const POST = async (request: NextRequest) => {
  const { fullname, email, password } = await request.json();
  await dbConnect();

  // Hash the password
  const hashedPassword = await bcryptjs.hash(password, 5);

  //Function to generate a ramdon Username
  const generateUsername = async (email: string) => {
    let username = email.split("@")[0];

    let isUsernameNotUnique = await users.exists({
      "personal_info.username": username,
    });

    isUsernameNotUnique ? (username += nanoid().substring(0, 5)) : "";

    /* console.log({
      Username: username,
      isUsernameNotUnique: isUsernameNotUnique,
    }); */

    return username;
  };

  // Get the username
  let username = await generateUsername(email);

  // Make a new User Objet to save in the database
  const newUser = new users({
    personal_info: {
      fullname,
      email,
      password: hashedPassword,
      username,
    },
  });
  try {
    const response = await newUser.save();

    return new NextResponse(JSON.stringify({ user: response, status: 200 }));

    //return new NextResponse("User Has been created", { status: 200 });
  } catch (err: any) {
    //console.log(err);
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
