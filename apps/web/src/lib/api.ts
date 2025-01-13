import { hc } from 'hono/client';
import type { Api } from '@app/server';

const url = new URL(new URL(import.meta.url).origin);
export const client = hc<Api>(url.origin);
export const socket = client.api.ws.$ws();
