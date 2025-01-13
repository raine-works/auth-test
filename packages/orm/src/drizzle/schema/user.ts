import { relations, type SQL, sql } from 'drizzle-orm';
import { type AnyPgColumn, boolean, pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { session } from '../../drizzle/schema/session.ts';
import { account } from '../../drizzle/schema/account.ts';

const lower = (email: AnyPgColumn): SQL => {
	return sql`lower(${email})`;
};

export const user = pgTable(
	'user',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		createdAt: timestamp('createdAt').notNull().defaultNow(),
		updatedAt: timestamp('updatedAt')
			.notNull()
			.defaultNow()
			.$onUpdate(() => new Date()),
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
}));
