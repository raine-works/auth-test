import { Hono } from 'hono';
import { getClientAppByClientId, getClientApps } from '@/lib/db.ts';

export const clientRoute = new Hono()
	.get('/apps', async (c) => {
		return c.json(await getClientApps());
	})
	.get('/app/:clientId', async (c) => {
		const { clientId } = c.req.param();
		const clientApp = await getClientAppByClientId(clientId);

		if (!clientApp) {
			return c.notFound();
		}

		return c.json(clientApp);
	});
