// @deno-types="@types/react"
import React from 'react';
import { createLazyRoute } from '@tanstack/react-router';
import { authClient } from '@/lib/auth.ts';
import { api } from '@/lib/api.ts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@auth-test/ui/src/components/card.tsx';
import { Button } from '@auth-test/ui/src/components/button.tsx';

const Consent = () => {
	const { client_id, scope } = Route.useSearch();
	const [app, setApp] = React.useState<{ name: string }>();

	const getClientApp = async () => {
		if (client_id) {
			const response = await api.client.app[':clientId'].$get({ param: { clientId: client_id } });
			if (response.ok) {
				const json = await response.json();
				setApp(json as { name: string });
			}
		}
	};

	const grantConsent = async () => {
		const { data, error } = await authClient.oauth2.consent({ accept: true });
		if (error) {
			console.error(error);
		} else {
			location.href = data.redirectURI;
		}
	};

	const revokeConsent = async () => {
		const { data, error } = await authClient.oauth2.consent({ accept: false });
		if (error) {
			console.error(error);
		} else {
			console.log(data);
		}
	};

	React.useEffect(() => {
		getClientApp();
	}, []);

	return (
		<>
			<div className='flex h-screen items-center justify-center'>
				<Card>
					<CardHeader>
						<CardTitle>Oauth Consent</CardTitle>
						<CardDescription>
							{app?.name} is requesting permission to perform actions on your behalf.
						</CardDescription>
						<CardDescription>Scope: {scope}</CardDescription>
					</CardHeader>
					<CardContent>
						<Button onClick={grantConsent} className='mr-2'>Continue</Button>
						<Button onClick={revokeConsent} variant='secondary'>Cancel</Button>
					</CardContent>
				</Card>
			</div>
		</>
	);
};

export const Route = createLazyRoute('/consent')({
	component: Consent,
});
