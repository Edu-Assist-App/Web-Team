import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser, registerUser } from "@/app/Services/api/auth";

interface Credentialsvalue {
  email: string;
  username: string;
  fullName: string;
  action: string;
  password: string;
}
// Define or import your UserValue and Token types
interface UserValue {
  refreshToken: string;
  accessToken: string;
}

interface Token {
  accessToken?: string;
  refreshToken?: string;
}

interface Session {
  accessToken?: string;
  refreshToken?: string;
}

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 12 * 60 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),

    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials): Promise<any> {
        if (!credentials) return null;
        const { email, username, fullName, action, password } =
          credentials as Credentialsvalue;
        console.log("Action:", action);
        console.log("Cred", credentials);
        try {
          if (action === "register") {
            // Call register API
            const data = await registerUser({
              email: email,
              username: username,
              full_name: fullName,
              password: password,
              is_active: true,
              is_superuser: false,
            });

            if (data?.access_token) {
              return {
                accessToken: data.access_token,
                refreshToken: "", // Add if available
                name: username,
              };
            }
          } else if (action === "login") {
            // Call login API
            const data = await loginUser({
              email: email,
              password: password,
            });

            if (data?.access_token) {
              return {
                accessToken: data.access_token,
                refreshToken: "", // Add if available
                name: username,
              };
            }
          }

          return null;
        } catch (error) {
          console.error("Authentication error", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log("USER", user);
      if (user) {
        // Cast user to the UserValue type
        token.accessToken = user.accessToken as string;
        token.refreshToken = user.refreshToken as string;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  pages: {
    error: "/error",
  },
};
