import { drizzle } from 'drizzle-orm/postgres-js';
import { user } from './drizzle/schema/user.ts';
import { account } from './drizzle/schema/account.ts';
import { session } from './drizzle/schema/session.ts';
import { verification } from './drizzle/schema/verification.ts';
import { oauthAccessToken } from './drizzle/schema/oauth-access-token.ts';
import { oauthApplication } from './drizzle/schema/oauth-application.ts';
import { oauthConsent } from './drizzle/schema/oauth-consent.ts';

export const db = drizzle({
	schema: { user, account, session, verification, oauthAccessToken, oauthApplication, oauthConsent },
	connection: {
		url: Deno.env.get('DATABASE_URL'),
		ssl: false,
	},
});

export const schema = { user, account, session, verification, oauthAccessToken, oauthApplication, oauthConsent };
