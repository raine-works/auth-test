import { app } from '@/app.ts';
import { env } from '@/configs/env.ts';

Deno.serve({ port: Number(env.PORT) }, app.fetch);

export type { Api, Session } from '@/env.d.ts';
