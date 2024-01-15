import dbConnect from "../mongodb/db";
import users from "../schema/User";

export const getUserByEmail = async (email: string) => {
  await dbConnect();
  try {
    const user = await users.findOne({
      "personal_info.email": email,
    });
    console.log(user);
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  await dbConnect();
  try {
    const user = await users.findById(id);
    return user;
  } catch {
    return null;
  }
};
