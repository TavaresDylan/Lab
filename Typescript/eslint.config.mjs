import { fileURLToPath } from 'url';
import { dirname } from 'path';
import globals from 'globals';
import eslintPluginVue from 'eslint-plugin-vue';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import vueParser from 'vue-eslint-parser';

// Utility to get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
	{
		files: ['*.vue', '**/*.vue'],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				project: './tsconfig.json',
				tsconfigRootDir: __dirname,
				extraFileExtensions: ['.vue'],
			},
			globals: {
				...globals.node,
				...globals.browser,
				...globals.es2021,
			},
		},
		plugins: {
			vue: eslintPluginVue,
			'@typescript-eslint': tsPlugin,
		},
		rules: {
			...eslintPluginVue.configs['flat/strongly-recommended'].rules,
			...tsPlugin.configs.recommended.rules,
			...tsPlugin.configs['strict'].rules,
			...eslintConfigPrettier.rules,
		},
	},
	{
		files: ['*.ts', '**/*.ts', '*.tsx', '**/*.tsx'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json',
				tsconfigRootDir: __dirname,
			},
			globals: {
				...globals.node,
				...globals.browser,
				...globals.es2021,
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
		},
		rules: {
			...tsPlugin.configs.recommended.rules,
			...tsPlugin.configs['strict'].rules,
			...eslintConfigPrettier.rules,
		},
	},
];
