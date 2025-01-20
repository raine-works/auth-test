import { createLazyRoute } from '@tanstack/react-router';
import { Button } from '@auth-test/ui/src/components/button.tsx';

const Home = () => {
	const loginWithOauth = async () => {
		const oauthUrl = new URL('http://localhost:3000/api/auth/oauth2/authorize');
		oauthUrl.searchParams.set('currentURL', location.href);
		oauthUrl.searchParams.set('client_id', 'kusuuysevoxfeyilnopdsiacqmnxwrma');
		oauthUrl.searchParams.set('response_type', 'code');
		oauthUrl.searchParams.set('redirect_uri', 'http://localhost:4000/client/oauth2/callback');
		oauthUrl.searchParams.set('scope', 'read+write');
		oauthUrl.searchParams.set('state', 'xyz123');
		oauthUrl.searchParams.set('code_challenge', 'E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM');
		oauthUrl.searchParams.set('code_challenge_method', 'S256');
		location.href = oauthUrl.href;
	};

	return (
		<>
			<div className='flex h-screen items-center justify-center'>
				<Button onClick={loginWithOauth}>Login with Oauth</Button>
			</div>
		</>
	);
};

export const Route = createLazyRoute('/')({
	component: Home,
});
