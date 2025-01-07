// @deno-types="@types/react"
import { StrictMode } from 'react';
import { createRouter, RouterProvider } from '@tanstack/react-router';
// @deno-types="@types/react-dom/client"
import { createRoot } from 'react-dom/client';
import { routeTree } from '@/routes.tsx';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
