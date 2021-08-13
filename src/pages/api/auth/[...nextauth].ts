import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { fauna } from "../../../Services/fauna";
import { query } from "faunadb";
//import { signIn } from "next-auth/client";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: "read:user",
    }),

    // ...add more providers here
  ],
  callbacks: {
    async signIn(user, account, profile) {
      const{email}=user;
      await fauna.query(
        query.Create(
          query.Collection('users'),
          { data:{email} }
        )
      )
      return true;
    },
  },
});
