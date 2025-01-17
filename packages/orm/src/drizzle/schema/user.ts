import { type AnyPgColumn, boolean, pgTable, text, uniqueIndex } from 'drizzle-orm/pg-core';
import { baseTable } from './lib/utils.ts';
import { relations, type SQL, sql } from 'drizzle-orm';
import { session } from '../../drizzle/schema/session.ts';
import { account } from '../../drizzle/schema/account.ts';
import { oauthAccessToken } from './oauth-access-token.ts';
import { oauthConsent } from './oauth-consent.ts';

const lower = (email: AnyPgColumn): SQL => {
	return sql`lower(${email})`;
};

export const user = pgTable(
	'user',
	{
		...baseTable,
		name: text('name').notNull(),
		email: text('email').notNull(),
		emailVerified: boolean('emailVerified'),
	},
	(table) => [
		uniqueIndex('emailIndex').on(lower(table.email)),
	],
);

export const userRelations = relations(user, ({ many }) => ({
	session: many(session),
	account: many(account),
	oauthAccessToken: many(oauthAccessToken),
	oauthConsent: many(oauthConsent),
}));
