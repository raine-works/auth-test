import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { user } from '../../drizzle/schema/user.ts';

export const session = pgTable(
	'session',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		createdAt: timestamp('createdAt').notNull().defaultNow(),
		updatedAt: timestamp('updatedAt')
			.notNull()
			.defaultNow()
			.$onUpdate(() => new Date()),
		expiresAt: timestamp('expiresAt').notNull(),
		userId: uuid('userId').references(() => user.id),
		token: text('token').unique().notNull(),
		ipAddress: text('ipAddress'),
		userAgent: text('userAgent'),
	},
);
