// @deno-types="@types/react"
import React from 'react';
import { createLazyRoute } from '@tanstack/react-router';
import { authClient } from '@/lib/auth.ts';
import { api } from '@/lib/api.ts';

type ClientApps = Awaited<ReturnType<Awaited<ReturnType<typeof api.client.apps['$get']>>['json']>>;

const Home = () => {
	const navigate = Route.useNavigate();
	const [apps, setApps] = React.useState<ClientApps>([]);
	const [name, setName] = React.useState('');
	const [redirectURL, setRedirectURL] = React.useState('');

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

	React.useEffect(() => {
		getApps();
	}, []);

	return (
		<>
			<div>
				<h1>You're In!</h1>
				<button onClick={signOut}>Sign Out</button>

				<ul>
					{apps.map((app, key) => {
						return (
							<li key={key}>
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
