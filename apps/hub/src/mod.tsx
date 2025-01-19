// @deno-types="@types/react"
import * as React from 'react';
// @deno-types="@types/react-dom/client"
import { createRoot } from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from '@/routes.tsx';
import './global.css';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider basepath='/' router={router} />
	</React.StrictMode>,
);
