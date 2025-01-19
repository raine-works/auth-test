import { hc } from 'hono/client';
import type { Api } from '@auth-test/server';

const url = new URL(new URL(import.meta.url).origin);
export const api = hc<Api>(url.origin).api;
export const socket = api.ws.$ws();
