// @deno-types="@types/react"
import React from 'react';

import { createLazyRoute } from '@tanstack/react-router';

const Home = () => {
	React.useEffect(() => {
		console.log('It loaded');
	});

	return (
		<>
			Test
		</>
	);
};

export const Route = createLazyRoute('/')({
	component: Home,
});
