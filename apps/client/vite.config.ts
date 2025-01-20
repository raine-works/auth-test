import { defineConfig } from 'vite';
import deno from '@deno/vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
	plugins: [deno(), react()],
	base: '/client',
	resolve: {
		alias: {
			'@': path.resolve(import.meta.dirname as string, './src'),
		},
	},
	build: {
		emptyOutDir: false,
		outDir: '../server/.static/client',
	},
	server: {
		host: '127.0.0.1',
		port: 4000,
		cors: {
			origin: ['http://localhost:3000', 'http://localhost:8000'],
			credentials: true,
		},
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:8000',
				changeOrigin: true,
			},
			'/api/ws': {
				target: 'http://127.0.0.1:8000',
				changeOrigin: true,
				ws: true,
			},
		},
	},
});
