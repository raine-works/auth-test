import { boolean, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { baseTable } from './lib/utils.ts';
import { oauthApplication } from './oauth-application.ts';
import { user } from './user.ts';

export const oauthConsent = pgTable('oauthConsent', {
	...baseTable,
	userId: uuid('userId').references(() => user.id),
	clientId: uuid('clientId').references(() => oauthApplication.clientId),
	scopes: text('scopes').notNull(),
	consentGiven: boolean('consentGiven'),
});
