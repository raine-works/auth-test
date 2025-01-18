// @deno-types="@types/react"
import * as React from 'react';
import { createLazyRoute, useNavigate } from '@tanstack/react-router';
import { authClient } from '@/lib/auth.ts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@app/ui/src/components/card.tsx';
import { Button } from '@app/ui/src/components/button.tsx';
import { Input } from '@app/ui/src/components/input.tsx';
import { Label } from '@app/ui/src/components/label.tsx';

const SignUp = () => {
	const navigate = useNavigate();
	const [name, setName] = React.useState('');
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
							<div className='flex flex-col gap-6'>
								<div className='grid gap-2'>
									<Label htmlFor='password'>Full Name</Label>
									<Input
										type='text'
										placeholder='name'
										value={name}
										onInput={(event) => {
											setName((event.target as HTMLInputElement).value);
										}}
									/>
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='password'>Email</Label>
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

export const Route = createLazyRoute('/sign-up')({
	component: SignUp,
});
