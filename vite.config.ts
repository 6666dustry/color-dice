import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	base: "/color-dice/",
	plugins: [sveltekit()],
	assetsInclude: [
		"**/*.csv"
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	}
});
