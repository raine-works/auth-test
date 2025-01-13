import type { logger } from '@/utils/logger.ts';
import type { auth } from '@/utils/auth.ts';

declare module 'hono' {
	interface ContextVariableMap {
		logger: typeof logger;
		user: typeof auth.$Infer.Session.user | null;
		session: typeof auth.$Infer.Session.session | null;
	}
}
