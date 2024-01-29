import authConfig from "@/utils/auth/auth.config";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
("next-auth/providers/credentials");
import clientPromise from "../mongodb/clientPromide";
import { getUserById } from "../data/getUser";
import { getAccountByUserId } from "../data/getAccount";
import NextAuth from "next-auth";


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  pages: {
    signIn: "/signin",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {},
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      /* if (account?.provider !== "credentials") {
        return true;
      } */
      console.log(user);
      const existingUser = await getUserById(user.id);

      // Prevent sign in without email verification
      //if (!existingUser?.emailVerified) return false;

      /* if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      } */

      return true;
    },
    async session({ token, session }) {
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser._id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.personal_info.fullname;
      token.email = existingUser.personal_info.email;
      token.picture = existingUser.personal_info.profile_img;
      
      return token;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  ...authConfig,
});
