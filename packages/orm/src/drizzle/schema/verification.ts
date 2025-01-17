import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { baseTable } from './lib/utils.ts';

export const verification = pgTable(
	'verification',
	{
		...baseTable,
		expiresAt: timestamp('expiresAt').notNull(),
		identifier: text('identifier').notNull(),
		value: text('value').notNull(),
	},
);
