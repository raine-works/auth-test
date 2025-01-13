import { Hono } from 'hono';
import { auth } from '@/utils/auth.ts';

export const authRoute = new Hono()
	.get('/session', (c) => {
		const session = c.get('session');
		const user = c.get('user');

		if (!user) {
			return c.body(null, 401);
		} else {
			return c.json({
				session,
				user,
			});
		}
	})
	.on(['POST', 'GET'], '*', (c) => {
		return auth.handler(c.req.raw);
	});
