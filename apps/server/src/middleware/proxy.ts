import { serveStatic } from 'hono/deno';
import { createMiddleware } from 'hono/factory';
import fs from 'node:fs';
import path from 'node:path';

export const proxy = (pathToStatic: string) => {
	return createMiddleware((c, next) => {
		const requestedPath = c.req.path;
		let fullPath = path.join(pathToStatic, requestedPath);
		const pathToStaticSplit = pathToStatic.split('/');
		if (requestedPath.startsWith(`/${pathToStaticSplit[pathToStaticSplit.length - 1]}`)) {
			fullPath = fullPath.replace(`/${pathToStaticSplit[pathToStaticSplit.length - 1]}`, '');
		}
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
