import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db, schema } from '@app/orm';
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
});
