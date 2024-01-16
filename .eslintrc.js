module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	plugins: [],
	extends: ['eslint:recommended'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'eol-last': ['error', 'always'],
		'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
		'no-trailing-spaces': [
			'error',
			{ skipBlankLines: false, ignoreComments: true },
		],
		'comma-spacing': ['error', { before: false, after: true }],
		'no-var': 'warn',
		'no-const-assign': 'error',
		'key-spacing': ['warn', { beforeColon: false, afterColon: true }],
		'no-unused-vars': 'warn',
	},
};
