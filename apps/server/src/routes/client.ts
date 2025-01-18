import { Hono } from 'hono';
import { getClientApps } from '@/lib/db.ts';

export const clientRoute = new Hono().get('/apps', async (c) => {
	return c.json(await getClientApps());
});
