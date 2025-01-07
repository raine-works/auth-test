import { createLazyRoute } from '@tanstack/react-router';

const Home = () => {
	return (
		<>
			<div>
				<h1>Hello World</h1>
			</div>
		</>
	);
};

export const Route = createLazyRoute('/')({
	component: Home,
});
