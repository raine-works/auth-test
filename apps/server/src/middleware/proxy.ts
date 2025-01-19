import { serveStatic } from 'hono/deno';
import { createMiddleware } from 'hono/factory';
import fs from 'node:fs';
import path from 'node:path';

export const proxy = (pathToStatic: string) => {
	return createMiddleware((c, next) => {
		const requestedPath = c.req.path;
		const fullPath = path.join(pathToStatic, requestedPath);
		console.log(fullPath);
		if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isFile()) {
			return serveStatic({ root: pathToStatic })(c, next);
		} else {
			return serveStatic({
				root: pathToStatic,
				rewriteRequestPath: () => '/index.html',
			})(c, next);
		}
	});
};
