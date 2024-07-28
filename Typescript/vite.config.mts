// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src/renderer'),
		},
	},
	build: {
		outDir: 'dist',
		rollupOptions: {
			input: path.resolve(__dirname, 'index.html'),
		},
	},
	plugins: [vue(), eslint()],
});
