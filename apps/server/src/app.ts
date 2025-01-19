import { Hono } from 'hono';
import { authRoute } from '@/routes/auth.ts';
import { clientRoute } from '@/routes/client.ts';
import { wsRoute } from '@/routes/ws.ts';
import { proxy } from '@/middleware/proxy.ts';
import { database } from '@/middleware/db.ts';
import { honoLogger } from '@/middleware/logger.ts';
import { session } from '@/middleware/session.ts';

export const app = new Hono().use(honoLogger);

export const api = app
	.basePath('/api')
	.use(database)
	.use(session)
	.route('/auth', authRoute)
	.route('/client', clientRoute)
	.route('/ws', wsRoute);

app.use('/client/*', proxy('./.static/client'));
app.use('/*', proxy('./.static'));
