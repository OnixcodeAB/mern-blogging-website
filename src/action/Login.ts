"use server";

import { getUserByEmail } from "@/utils/data/getUser";
import dbConnect from "@/utils/mongodb/db";
import { LoginSchema } from "@/utils/schema";
import { signIn } from "@/utils/auth/auth";
import { z } from "zod";
import { AuthError } from "next-auth";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, Password } = validatedFields.data;

  //const existingUser = await getUserByEmail(email);

  // Validatiton when the user log in with google or github
  /*  if (!existingUser || !existingUser.email) {
    return { error: "Email does not exist!" };
  } */

  try {
    await signIn("credentials", {
      email,
      Password,
      redirectTo: "/editor",
    });
    return { success: "Login Succesfully 🟢" };
  } catch (error) {
    if (error instanceof AuthError) {
      console.log(error.message);
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
