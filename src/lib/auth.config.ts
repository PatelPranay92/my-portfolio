export const authConfig = {
  pages: {
    signIn: "/pranaypatel18/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }: any) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith("/pranaypatel18");
      const isLoginRoute = nextUrl.pathname === "/pranaypatel18/login";

      if (isAdminRoute) {
        if (isLoggedIn) {
          return true;
        }
        // Return false to let NextAuth redirect to the sign-in page with a callbackUrl
        if (!isLoginRoute) {
          return false;
        }
        return true;
      }

      // Allow access to public routes
      return true;
    },
    jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [], // Configured in auth.ts
};
