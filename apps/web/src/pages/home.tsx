import { createLazyRoute, useNavigate } from '@tanstack/react-router';
import { authClient } from '@/lib/auth.ts';

const Home = () => {
	const navigate = useNavigate();

	const signOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					navigate({ to: '/sign-in' });
				},
			},
		});
	};

	return (
		<>
			<div>
				<h1>You're In!</h1>
				<button onClick={signOut}>Sign Out</button>
			</div>
		</>
	);
};

export const Route = createLazyRoute('/')({
	component: Home,
});
