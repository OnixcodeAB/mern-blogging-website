import dbConnect from "../mongodb/db";
import users from "../schema/User";

export const getAccountByUserId = async (userId: string) => {
  await dbConnect();
  try {
    const user = await users.findOne({ _id: userId });
    return user;
  } catch {
    return null;
  }
};
