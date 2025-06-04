// eslint.config.js
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
	// TypeScript ESLint config (готова конфігурація без ітерацій)
	...tseslint.configs.recommended,

	// React + React Hooks + базові правила
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
			globals: {
				...globals.browser,
				React: true, // Якщо хочеш прибрати помилки щодо React у JSX
			},
		},
		plugins: {
			react: pluginReact,
			'react-hooks': pluginReactHooks,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			// Вимикаємо непотрібне
			'react/display-name': 'off',
			'react/prop-types': 'off',

			// React hooks
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',

			'react-hooks/exhaustive-deps': 'off',
		},
	},
];
