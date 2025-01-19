// @deno-types="@types/react"
import React from 'react';

import { createLazyRoute } from '@tanstack/react-router';

React.useEffect(() => {
	console.log('It loaded');
});

const Home = () => {
	return (
		<>
			Test
		</>
	);
};

export const Route = createLazyRoute('/')({
	component: Home,
});
