import type { logger } from '@/lib/logger.ts';
import type { db, schema } from '@/lib/db.ts';
import type { api } from '@/app.ts';

export type Session = {
	session: typeof schema.session.$inferSelect;
	user: typeof schema.user.$inferSelect;
};

declare module 'hono' {
	interface ContextVariableMap {
		db: typeof db;
		schema: typeof schema;
		logger: typeof logger;
		session: Session['session'] | null;
		user: Session['user'] | null;
	}
}

export type Api = typeof api;
