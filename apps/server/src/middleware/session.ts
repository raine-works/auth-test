import { createMiddleware } from 'hono/factory';
import { auth } from '@/lib/auth.ts';
import { UAParser } from 'ua-parser-js';
import type { Session } from '@/env.d.ts';

export const session = createMiddleware(async (c, next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers }) as unknown as Session;

	if (!session) {
		c.set('user', null);
		c.set('session', null);
		return next();
	}

	const ua = UAParser(session.session.userAgent!);
	console.log(ua.os.name);

	c.set('user', session.user);
	c.set('session', session.session);
	return next();
});
