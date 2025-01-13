import { createMiddleware } from 'hono/factory';
import { auth } from '@/utils/auth.ts';

export const session = createMiddleware(async (c, next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });
	console.log(session);

	if (!session) {
		c.set('user', null);
		c.set('session', null);
		return next();
	} else {
		c.set('user', session.user);
		c.set('session', session.session);
		return next();
	}
});
