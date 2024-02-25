import NextAuth, { type NextAuthConfig } from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { z } from 'zod';
import bcryptjs from 'bcryptjs';
import prisma from '@/lib/prisma';
import { Adapter } from 'next-auth/adapters';


export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
    error: '/auth/login',
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (!parsedCredentials.success) return null;
        const { email, password } = parsedCredentials.data;

        //buscar correo
        const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
        if (!user) return null;

        //comprar las password
        if (!bcryptjs.compareSync(password, user.password ?? '')) return null;

        // regresar el usuario sin el password
        const { password: _, ...rest } = user;

        return rest;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const dbUser = await prisma.user.findUnique({ where: { email: user.email ?? 'no-email' } });
      if (dbUser?.isActive === false) {
        return '/auth/login?error=unauthorized'
      }
      if ( dbUser && !dbUser?.image ){
        await prisma.user.update({
          where: {
            id: dbUser?.id
          },
          data: {
            image: user.image
          }
        })
      
      }

      return true
    },
    authorized({ auth, request: { nextUrl } }) {

      console.log({ auth })
      // const isLoggedIn = !!auth?.user;
      // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      // if (isOnDashboard) {
      //     if (isLoggedIn) return true;
      //     return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //     return Response.redirect(new URL('/dashboard', nextUrl));
      // }
      return true;
    },
    async jwt({ token, user }) {
     
      if (user) {
        token.data = user
      }
      
      return token
    },
    async session({ session, token, user }) {
    
      session.user = token.data as any;
      return session;
    },
  },
};


export const {
  signIn,
  signOut,
  auth,
  handlers
} = NextAuth(authConfig);