module.exports = {
	root: true,
	env: {
		node: true, // For Electron and Node.js environments
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser', // Specifies the TypeScript parser for `<script>` blocks
	},
	plugins: {
		'@typescript-eslint': {},
	},
	extends: [
		'plugin:vue/vue3-strongly-recommended',
		'eslint:recommended',
		'@vue/typescript/recommended',
		'plugin:prettier/recommended',
		'prettier',
	],
	rules: {
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
			},
		],
	},
};
