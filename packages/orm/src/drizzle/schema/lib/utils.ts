import { timestamp, uuid } from 'drizzle-orm/pg-core';

export const baseTable = {
	id: uuid('id').primaryKey().defaultRandom(),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt')
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
};
