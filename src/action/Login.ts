"use server";

import { getUserByEmail } from "@/utils/data/getUser";
import dbConnect from "@/utils/mongodb/db";
import { LoginSchema } from "@/utils/schema";
import { error } from "console";
import { signIn } from "@/utils/auth/auth";
import { z } from "zod";

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
    //await dbConnect();
    await signIn("credentials", {
      email,
      Password,
      redirectTo: "/editor"  // Create a file with route
    });
    return { success: "Confirmation email sent!" };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
