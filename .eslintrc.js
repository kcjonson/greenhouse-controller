/* eslint-disable no-undef */
//console.log('ESLint config found');

module.exports = { 
	parser: '@babel/eslint-parser',
	parserOptions: {
		babelOptions: {
			rootMode: 'upward',
		},
	},
	settings: {
		react: {
			'version': 'detect',
		},
	},
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:react/recommended',
	],
	plugins: [
		'react',
		'import',
	],
	rules: {
		'indent': ['error', 'tab'], 											// dealWithIt.gif
		'semi': ['error', 'always', {'omitLastInOneLineBlock': true}],			// Reduces production bugs, ask me how I know.
		'no-extra-semi': 'off',													// Fights with 'semi: always' (which is hella lame)
		'comma-dangle': ['error', 'always-multiline'],  						// Makes git diffs much nicer. 
		'quotes': ['error', 'single'],											// abritrary code style match, also ... they look prettier
		'jsx-quotes': ['error', 'prefer-single'],								// same as previous
		'import/no-unresolved': 'off',											// TODO: Make it understand foo/index.jsx, off for now
		'react/prop-types': 'off',												// TODO: Re-enable with Typescript
	},
};
