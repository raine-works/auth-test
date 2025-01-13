import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const verification = pgTable(
	'verification',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		createdAt: timestamp('createdAt').notNull().defaultNow(),
		updatedAt: timestamp('updatedAt')
			.notNull()
			.defaultNow()
			.$onUpdate(() => new Date()),
		expiresAt: timestamp('expiresAt').notNull(),
		identifier: text('identifier').notNull(),
		value: text('value').notNull(),
	},
);
