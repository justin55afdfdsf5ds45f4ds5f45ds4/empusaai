import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
// import CredentialsProvider from 'next-auth/providers/credentials'; // We can add this later for email/password

// Define authOptions but DO NOT export it directly
const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // Add Credentials provider later if needed
    // CredentialsProvider({
    //   name: 'Credentials',
    //   credentials: {
    //     email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
    //     password: { label: "Password", type: "password" }
    //   },
    //   async authorize(credentials, req) {
    //     // Add logic here to look up the user from the credentials supplied
    //     // Example: const user = await findUserByEmail(credentials.email)
    //     const user = { id: "1", name: "J Smith", email: "jsmith@example.com" } // Placeholder

    //     if (user /* && verifyPassword(credentials.password, user.password) */) {
    //       // Any object returned will be saved in `user` property of the JWT
    //       return user
    //     } else {
    //       // If you return null then an error will be displayed advising the user to check their details.
    //       return null
    //       // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
    //     }
    //   }
    // })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // Add other configurations like database adapter, pages, callbacks etc. later
  pages: {
    signIn: '/auth/login', // Redirect users to login page
    // error: '/auth/error', // Error code passed in query string as ?error=
  },
  // Add callbacks if needed, e.g., for JWT handling or session management
  // callbacks: {
  //   async jwt({ token, user }) {
  //     // Persist the user id to the token right after signin
  //     if (user) {
  //       token.id = user.id;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     // Send properties to the client, like an access_token and user id from a provider.
  //     session.user.id = token.id;
  //     return session;
  //   },
  // },
};

// Initialize NextAuth with the options
const handler = NextAuth(authOptions);

// Export only the handlers for GET and POST methods
export { handler as GET, handler as POST }; 