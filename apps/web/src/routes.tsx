import { createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { client } from '@/lib/api.ts';
import { redirect } from '@tanstack/react-router';

const isAuthenticated = async () => {
	const response = await client.api.auth.session.$get();
	if (response.ok) {
		const json = await response.json();
		return json;
	} else {
		return null;
	}
};

const rootRoute = createRootRoute({
	component: () => <Outlet />,
});

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	beforeLoad: async () => {
		if (!(await isAuthenticated())) {
			throw redirect({
				to: '/sign-in',
			});
		}
	},
}).lazy(() => import('@/pages/home.tsx').then((d) => d.Route));

const signUpRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/sign-up',
}).lazy(() => import('@/pages/sign-up.tsx').then((d) => d.Route));

const signInRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/sign-in',
}).lazy(() => import('@/pages/sign-in.tsx').then((d) => d.Route));

export const routeTree = rootRoute.addChildren([indexRoute, signUpRoute, signInRoute]);
