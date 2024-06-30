const PASCAL_CASE = '*([A-Z]*([a-z0-9]))';
const KEBAB_CASE = '+([a-z])*([a-z0-9])*(-+([a-z0-9]))';
const FLAT_CASE = '+([a-z0-9])';

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  ignorePatterns: ['node_modules/*', '!.storybook'],
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: ['react-refresh', 'check-file', 'prettier', 'vitest'],
  rules: {
    'import/no-cycle': 'error',
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          // disables cross-feature imports:
          // src/features/todos should not import from src/features/sample, etc.
          {
            target: './src/features/todos',
            from: './src/features',
            except: ['./todos'],
          },
          // src/app can import from src/features but not the other way around
          {
            target: './src/features',
            from: './src/app',
          },
          // src/features and src/app can import from these shared modules but not the other way around
          {
            target: [
              './src/components',
              './src/hooks',
              './src/lib',
              './src/types',
              './src/utils',
            ],
            from: ['./src/features', './src/app'],
          },
        ],
      },
    ],
    'react/prop-types': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'check-file/filename-naming-convention': [
      'error',
      {
        'src/**/*.{jsx,tsx}': `${PASCAL_CASE}|${FLAT_CASE}|${KEBAB_CASE}`,
        'src/**/*.{js,ts}': `${KEBAB_CASE}|${FLAT_CASE}`,
      },
      {
        ignoreMiddleExtensions: true,
      },
    ],
    'check-file/folder-match-with-fex': [
      'error',
      { '*.test.{js,jsx,ts,tsx}': '**/__tests__/' },
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        react: { version: 'detect' },
        'import/resolver': {
          typescript: {},
        },
      },
      extends: [
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: 'e2e/**',
      extends: 'plugin:playwright/recommended',
    },
  ],
};
