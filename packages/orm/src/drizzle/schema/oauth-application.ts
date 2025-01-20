import { boolean, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { baseTable } from './lib/utils.ts';
import { oauthAccessToken } from './oauth-access-token.ts';
import { oauthConsent } from './oauth-consent.ts';

export const oauthApplication = pgTable('oauthApplication', {
	...baseTable,
	clientId: text('clientId').unique().notNull(),
	clientSecret: text('clientSecret').notNull(),
	name: text('name').notNull(),
	redirectURLs: text('redirectURLs').notNull(),
	metadata: text('metadata'),
	type: text('type').notNull(),
	disabled: boolean('disabled'),
	userId: uuid('userId'),
});

export const oauthApplicationRelations = relations(oauthApplication, ({ many }) => ({
	oauthAccessToken: many(oauthAccessToken),
	oauthConsent: many(oauthConsent),
}));
