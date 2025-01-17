import { createLazyRoute, useNavigate } from '@tanstack/react-router';
// @deno-types="@types/react"
import { useState } from 'react';
import { authClient } from '@/lib/auth.ts';

const SignIn = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<>
			<form
				onSubmit={async (event) => {
					event.preventDefault();
					const { data, error } = await authClient.signIn.email({
						email,
						password,
					});
					if (error) {
						console.error(error);
					}

					if (data) {
						navigate({ to: '/' });
					}
				}}
			>
				<h1>Sign In</h1>
				<input
					type='text'
					placeholder='email'
					value={email}
					onInput={(event) => {
						setEmail((event.target as HTMLInputElement).value);
					}}
				/>
				<input
					type='password'
					placeholder='password'
					value={password}
					onInput={(event) => {
						setPassword((event.target as HTMLInputElement).value);
					}}
				/>
				<button type='submit'>Sign Up</button>
			</form>
		</>
	);
};

export const Route = createLazyRoute('/sign-in')({
	component: SignIn,
});
