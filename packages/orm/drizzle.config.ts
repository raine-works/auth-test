import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	out: './src/drizzle/migrations',
	schema: './src/drizzle/schema/*',
	dialect: 'postgresql',
	verbose: true,
	strict: true,
	migrations: {
		schema: 'public',
	},
	dbCredentials: {
		url: Deno.env.get('DATABASE_URL')!,
	},
});
