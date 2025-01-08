import { Hono } from 'hono';
import { wsRoute } from '@/routes/ws.ts';
import { proxy } from '@/middleware/proxy.ts';

export const app = new Hono();

export const api = app
	.basePath('/api')
	.route('/ws', wsRoute);

app.use(proxy('./.static/web'));
