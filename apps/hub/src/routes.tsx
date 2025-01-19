import { createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { redirect } from '@tanstack/react-router';
import { getSession } from '@/lib/auth.ts';

const rootRoute = createRootRoute({
	component: () => <Outlet />,
});

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	beforeLoad: async () => {
		if (!(await getSession())) {
			throw redirect({
				to: '/sign-in',
			});
		}
	},
}).lazy(() => import('./pages/home.tsx').then((d) => d.Route));

const signUpRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/sign-up',
}).lazy(() => import('./pages/sign-up.tsx').then((d) => d.Route));

const signInRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/sign-in',
}).lazy(() => import('./pages/sign-in.tsx').then((d) => d.Route));

export const routeTree = rootRoute.addChildren([indexRoute, signUpRoute, signInRoute]);
