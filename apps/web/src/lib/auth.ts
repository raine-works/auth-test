import { createAuthClient } from 'better-auth/react';
import { oidcClient } from 'better-auth/client/plugins';
import type { Session } from '@app/server';

export const authClient = createAuthClient({
	baseURL: new URL(import.meta.url).origin,
	plugins: [
		oidcClient(),
	],
});

export const getSession = async () => {
	const { data, error } = await authClient.getSession();
	if (error) {
		console.error(error);
		return null;
	} else {
		return data as Session;
	}
};
