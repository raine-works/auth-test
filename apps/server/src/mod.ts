import { type api, app } from '@/app.ts';

Deno.serve({ port: 8000 }, app.fetch);

export type Api = typeof api;
