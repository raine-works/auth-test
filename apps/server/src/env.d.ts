import type { logger } from '@/lib/logger.ts';
import type { db, quickQueries, schema } from '@app/orm';
import type { api } from '@/app.ts';

export type Session = {
	session: typeof schema.session.$inferSelect;
	user: typeof schema.user.$inferSelect;
};

declare module 'hono' {
	interface ContextVariableMap {
		db: typeof db;
		quickQueries: typeof quickQueries;
		schema: typeof schema;
		logger: typeof logger;
		session: Session['session'] | null;
		user: Session['user'] | null;
	}
}

export type Api = typeof api;
