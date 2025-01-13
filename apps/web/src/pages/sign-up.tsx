import { createLazyRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { authClient } from '@/lib/auth.ts';

const SignUp = () => {
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<>
			<form
				onSubmit={async (event) => {
					event.preventDefault();
					const { data, error } = await authClient.signUp.email({
						name,
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
				<h1>Sign Up</h1>
				<input
					type='text'
					placeholder='name'
					value={name}
					onInput={(event) => {
						setName((event.target as HTMLInputElement).value);
					}}
				/>
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

export const Route = createLazyRoute('/sign-up')({
	component: SignUp,
});
