import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { baseTable } from './lib/utils.ts';
import { user } from '../../drizzle/schema/user.ts';

export const session = pgTable(
	'session',
	{
		...baseTable,
		expiresAt: timestamp('expiresAt').notNull(),
		userId: uuid('userId').references(() => user.id),
		token: text('token').unique().notNull(),
		ipAddress: text('ipAddress'),
		userAgent: text('userAgent'),
	},
);
