import { createLazyRoute } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@auth-test/ui/src/components/card.tsx';

const OAuthCallback = () => {
	return (
		<>
			<div className='flex h-screen items-center justify-center'>
				<Card>
					<CardHeader>
						<CardTitle>This is your authorization code</CardTitle>
						<CardDescription>You can use this code to get an accessToken.</CardDescription>
					</CardHeader>
					<CardContent>
						<CardDescription>{Route.useSearch().code}</CardDescription>
					</CardContent>
				</Card>
			</div>
		</>
	);
};

export const Route = createLazyRoute('/oauth2/callback')({
	component: OAuthCallback,
});
