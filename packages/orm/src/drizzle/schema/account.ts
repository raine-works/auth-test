import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { baseTable } from './lib/utils.ts';
import { user } from '../../drizzle/schema/user.ts';

export const account = pgTable(
	'account',
	{
		...baseTable,
		userId: uuid('userId').references(() => user.id),
		accountId: text('accountId').notNull(),
		providerId: text('providerId').notNull(),
		accessToken: text('accessToken'),
		refreshToken: text('refreshToken'),
		idToken: text('idToken'),
		accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
		refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
		scope: text('scope'),
		password: text('password'),
	},
);
