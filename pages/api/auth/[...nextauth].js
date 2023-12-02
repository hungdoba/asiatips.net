import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (
          credentials.email === 'admin@asiatips.net' &&
          bcrypt.compareSync(
            credentials.password,
            '$2a$12$Cv6hslGpDPwi6aG9tqcF7O50.d1rl6yW8gLmn7Jyh2XB4p9x4vj/i'
          )
        ) {
          return {
            id: '1',
            name: 'admin',
            email: 'admin@Asiatips.net',
          };
        }
        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
