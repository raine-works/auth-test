import { Hono } from 'hono';
import { upgradeWebSocket } from 'hono/deno';

export const wsRoute = new Hono()
	.get(
		'/',
		upgradeWebSocket((c) => {
			return {
				onMessage(event, ws) {
					c.var.logger.debug(event.data);
					ws.send('Hello from server!');
				},
				onOpen: () => {
					c.var.logger.debug('Client connected.');
				},
				onClose: () => {
					c.var.logger.debug('Client disconnected.');
				},
			};
		}),
	);
