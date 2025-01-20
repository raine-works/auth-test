// @deno-types="@types/react"
import * as React from 'react';
import { createLazyRoute } from '@tanstack/react-router';
import { authClient } from '@/lib/auth.ts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@auth-test/ui/src/components/card.tsx';
import { Button } from '@auth-test/ui/src/components/button.tsx';
import { Input } from '@auth-test/ui/src/components/input.tsx';
import { Label } from '@auth-test/ui/src/components/label.tsx';

const SignIn = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	return (
		<>
			<div className='flex h-screen items-center justify-center'>
				<Card>
					<CardHeader>
						<CardTitle className='text-2xl'>Login</CardTitle>
						<CardDescription>
							Enter your email below to login to your account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form
							onSubmit={async (event) => {
								event.preventDefault();
								await authClient.signIn.email({
									email,
									password,
									callbackURL: '/',
									fetchOptions: {
										onSuccess: (data: { response: { url: string } }) => {
											location.href = data.response.url;
										},
									},
								});
							}}
						>
							<div className='flex flex-col gap-6'>
								<div className='grid gap-2'>
									<Label htmlFor='email'>Email</Label>
									<Input
										type='text'
										placeholder='email'
										value={email}
										onInput={(event) => {
											setEmail((event.target as HTMLInputElement).value);
										}}
									/>
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='password'>Password</Label>
									<Input
										type='password'
										placeholder='password'
										value={password}
										onInput={(event) => {
											setPassword((event.target as HTMLInputElement).value);
										}}
									/>
								</div>
								<Button type='submit' className='w-full'>Sign Up</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</>
	);
};

export const Route = createLazyRoute('/sign-in')({
	component: SignIn,
});
