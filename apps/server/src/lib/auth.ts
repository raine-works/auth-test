import { betterAuth } from 'better-auth';
import { oidcProvider } from 'better-auth/plugins';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db, schema } from '@auth-test/orm';
import { env } from '@/configs/env.ts';

export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: 'pg', schema }),
	secret: env.BETTER_AUTH_SECRET,
	trustedOrigins: ['*'],
	emailAndPassword: {
		enabled: true,
	},
	advanced: {
		cookiePrefix: 'my-app',
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
		oidcProvider({
			loginPage: '/sign-in',
			consentPage: '/sign-in/#consent',
			scopes: ['app:test'],
			metadata: {},
			generateClientId: () => {
				return crypto.randomUUID();
			},
		}),
	],
});
