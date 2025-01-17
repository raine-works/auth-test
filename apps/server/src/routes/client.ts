import { Hono } from 'hono';

export const clientRoute = new Hono().get('/apps', async (c) => {
	const queries = c.get('quickQueries');
	return c.json(await queries.getClientApps());
});
