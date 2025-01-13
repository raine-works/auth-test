import { createMiddleware } from 'hono/factory';
import { logger } from '@/utils/logger.ts';

export const honoLogger = createMiddleware(async (c, next) => {
	c.set('logger', logger);
	logger.info(`<-- ${c.req.method}: ${c.req.path}`);
	await next();
	logger.info(`--> ${c.req.method}: ${c.req.path} ${c.res.status}`);
});
