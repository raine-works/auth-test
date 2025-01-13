import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { user } from '../../drizzle/schema/user.ts';

export const account = pgTable(
	'account',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		createdAt: timestamp('createdAt').notNull().defaultNow(),
		updatedAt: timestamp('updatedAt')
			.notNull()
			.defaultNow()
			.$onUpdate(() => new Date()),
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
