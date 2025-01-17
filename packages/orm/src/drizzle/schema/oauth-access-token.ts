import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { baseTable } from './lib/utils.ts';
import { oauthApplication } from './oauth-application.ts';
import { user } from './user.ts';

export const oauthAccessToken = pgTable('oauthAccessToken', {
	...baseTable,
	accessToken: text('accessToken').notNull(),
	refreshToken: text('refreshToken').notNull(),
	accessTokenExpiresAt: timestamp('accessTokenExpiresAt').notNull(),
	refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt').notNull(),
	clientId: uuid('clientId').references(() => oauthApplication.clientId),
	userId: uuid('userId').references(() => user.id),
	scopes: text('scopes').notNull(),
});
