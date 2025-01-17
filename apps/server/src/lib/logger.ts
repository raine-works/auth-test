import { pino } from 'pino';
import pretty from 'pino-pretty';
import { env } from '@/configs/env.ts';

export const logger = pino(
	{ level: env.LOG_LEVEL || 'info' },
	env.NODE_ENV === 'production' ? undefined : pretty({
		colorize: true,
	}),
);
