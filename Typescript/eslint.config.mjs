import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import parser from 'vue-eslint-parser';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
	baseDirectory: import.meta.url,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	...compat.extends(
		'plugin:vue/base',
		'plugin:vue/vue3-essential',
		'plugin:vue/vue3-recommended',
		'plugin:vue/vue3-strongly-recommended',
		'eslint:recommended',
		'@vue/typescript/recommended',
		'plugin:prettier/recommended',
		'prettier'
	),
	{
		plugins: {
			'@typescript-eslint': typescriptEslint,
		},

		languageOptions: {
			globals: {
				...globals.node,
			},

			parser: parser,
			ecmaVersion: 5,
			sourceType: 'commonjs',

			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
		},

		rules: {
			'prettier/prettier': [
				'warn',
				{
					endOfLine: 'auto',
				},
			],
		},
	},
];
