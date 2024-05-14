import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import pool from '../../../../db';
import bcrypt from 'bcryptjs';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',

            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    const client = await pool.connect();
                    const result = await client.query('SELECT name, email, password FROM users WHERE email = $1', [email]);
                    const user = result.rows[0];
                    client.release();

                    if (!user) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (!passwordsMatch) {
                        return null;
                    }
                    return user;
                } catch (error) {
                    console.error('Error during authentication:', error);
                    throw new Error('Authentication failed');
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/',
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
