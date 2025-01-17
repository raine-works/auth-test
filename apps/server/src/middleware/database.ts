import { createMiddleware } from 'hono/factory';
import { db, quickQueries, schema } from '@app/orm';

export const database = createMiddleware(async (c, next) => {
	c.set('db', db);
	c.set('quickQueries', quickQueries);
	c.set('schema', schema);
	await next();
});
