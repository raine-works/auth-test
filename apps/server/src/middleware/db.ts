import { createMiddleware } from 'hono/factory';
import { db, schema } from '@/lib/db.ts';

export const database = createMiddleware(async (c, next) => {
	c.set('db', db);
	c.set('schema', schema);
	await next();
});
