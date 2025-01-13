import { Hono } from 'hono';
import { authRoute } from '@/routes/auth.ts';
import { wsRoute } from '@/routes/ws.ts';
import { proxy } from '@/middleware/proxy.ts';
import { honoLogger } from '@/middleware/logger.ts';

export const app = new Hono().use(honoLogger);

export const api = app
	.basePath('/api')
	.route('/auth', authRoute)
	.route('/ws', wsRoute);

app.use(proxy('./.static/web'));
