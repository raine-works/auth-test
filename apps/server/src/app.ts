import { Hono } from 'hono';
import { wsRoute } from '@/routes/ws.ts';

export const app = new Hono();

export const api = app
	.basePath('/api')
	.route('/ws', wsRoute);
