import authConfig from "@/utils/auth/auth.config";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
("next-auth/providers/credentials");
import clientPromise from "../mongodb/clientPromide";
import { getUserById } from "../data/getUser";
import { getAccountByUserId } from "../data/getAccount";
import NextAuth from "next-auth";

/* export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET!,
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // ...add more providers here
    Credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await dbConnect();
        // Add logic here to look up the user from the credentials supplied
        if (credentials == null) return null;
        // login

        try {
          const user = await users.findOne({
            "personal_info.email": credentials.email,
          });
          //console.log(user.personal_info);
          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.personal_info.password
            );
            if (isMatch) {
              return user;
            } else {
              throw new Error("Email or password is incorrect");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    signOut: "/",
    newUser: "/",
    error: "/signin",
  },
  callbacks: {
    // We can pass in additional information from the user document MongoDB returns
    async jwt({ token, user }: any) {
      if (user) {
        console.log(user.personal_info.email);
        token.user = {
          _id: user._id,
          email: user.personal_info.email,
          name: user.personal_info.fullname,
          username: user.personal_info.username,
          image: user.personal_info.profile_img
        };
        console.log(token)
      }
      return token;
    },
    // If we want to access our extra user info from sessions we have to pass it the token here to get them in sync:
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions); */

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
