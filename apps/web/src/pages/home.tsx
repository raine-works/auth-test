import { createLazyRoute, useNavigate } from '@tanstack/react-router';
// @deno-types="@types/react"
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth.ts';
import { api } from '@/lib/api.ts';

type ClientApps = Awaited<ReturnType<Awaited<ReturnType<typeof api.client.apps['$get']>>['json']>>;

const Home = () => {
	const navigate = useNavigate();
	const [apps, setApps] = useState<ClientApps>([]);
	const [name, setName] = useState('');
	const [redirectURL, setRedirectURL] = useState('');

	const getApps = async () => {
		const response = await api.client.apps.$get();
		if (response.ok) {
			const json = await response.json();
			setApps(json);
		}
	};

	const signOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					navigate({ to: '/sign-in' });
				},
			},
		});
	};

	useEffect(() => {
		getApps();
	}, []);

	return (
		<>
			<div>
				<h1>You're In!</h1>
				<button onClick={signOut}>Sign Out</button>

				<ul>
					{apps.map((app) => {
						return (
							<li>
								<div>
									<p>{app.name}</p>
									<p>{app.redirectURLs}</p>
								</div>
							</li>
						);
					})}
				</ul>

				<form
					onSubmit={async (event) => {
						event.preventDefault();
						await authClient.oauth2.register({ name, redirectURLs: [redirectURL] });
						setApps([...apps, { name, redirectURLs: redirectURL }]);
					}}
				>
					<input
						type='text'
						placeholder='Name'
						value={name}
						onInput={(event) => {
							setName((event.target as HTMLInputElement).value);
						}}
					/>
					<input
						type='text'
						placeholder='Redirect URL'
						value={redirectURL}
						onInput={(event) => {
							setRedirectURL((event.target as HTMLInputElement).value);
						}}
					/>
					<button type='submit'>Register</button>
				</form>
			</div>
		</>
	);
};

export const Route = createLazyRoute('/')({
	component: Home,
});
