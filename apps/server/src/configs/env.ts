import { z } from 'zod';

const EnvSchema = z.object({
	LOG_LEVEL: z.enum(['info', 'debug']),
	NODE_ENV: z.enum(['development', 'test', 'production']),
	PORT: z.string().default('8000'),
	DATABASE_URL: z.string(),
	BETTER_AUTH_SECRET: z.string(),
	TZ: z.string(),
});

export const env = EnvSchema.parse(Deno.env.toObject());
