import { betterAuth } from 'better-auth';
import { oidcProvider, openAPI } from 'better-auth/plugins';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db, schema } from '@auth-test/orm';
import { env } from '@/configs/env.ts';

export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: 'pg', schema }),
	secret: env.BETTER_AUTH_SECRET,
	trustedOrigins: ['http://localhost:3000'],
	emailAndPassword: {
		enabled: true,
	},
	advanced: {
		cookiePrefix: 'auth-test',
		generateId: () => {
			return crypto.randomUUID();
		},
	},
	session: {
		cookieCache: {
			enabled: true,
		},
	},
	plugins: [
		openAPI(),
		oidcProvider({
			loginPage: 'http://localhost:3000/sign-in',
			consentPage: 'http://localhost:3000/consent',
			scopes: ['read', 'read+write'],
			metadata: {
				issuer: 'http://localhost:3000',
				authorization_endpoint: 'http://localhost:3000/api/auth/oauth2/authorize',
				token_endpoint: 'http://localhost:3000/api/auth/oauth2/token',
			},
		}),
	],
});
