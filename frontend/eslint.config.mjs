// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';
import fsdPlugin from 'eslint-plugin-fsd-lint';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const eslintConfig = defineConfig([
  // Базовые конфиги Next.js
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  fsdPlugin.configs.recommended,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**',
    '.history/**',
  ]),
  {
    plugins: {
      fsd: fsdPlugin,
    },
    rules: {
      // Enforces FSD layer import rules (e.g., features cannot import pages)
      'fsd/forbidden-imports': 'error',

      // Disallows relative imports between slices/layers, use aliases (@)
      // Allows relative imports within the same slice by default (configurable)
      'fsd/no-relative-imports': 'error',

      // Enforces importing only via public API (index files)
      'fsd/no-public-api-sidestep': 'error',

      // Prevents direct imports between slices in the same layer
      'fsd/no-cross-slice-dependency': 'error',

      // Prevents UI imports in business logic layers (e.g., entities)
      'fsd/no-ui-in-business-logic': 'error',

      // Forbids direct import of the global store
      'fsd/no-global-store-imports': 'error',
    },
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // Сортировка импортов
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. Библиотеки (react, next и т.д.)
            ['^react', '^next', '^[a-z]'],
            // 2. Внутренние алиасы (@/components, @/lib...)
            ['^@'],
            // 3. Родительские импорты (.., ../..)
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // 4. Локальные импорты (./)
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // 5. Стили
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      // Правила импортов
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',

      // Запрет дефолтных экспортов (глобально)
      'import/no-default-export': 'error',

      'prettier/prettier': 'error',

      semi: 'off',
      'arrow-body-style': ['error', 'as-needed'],
      'react/self-closing-comp': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-empty': 'error',
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
  },

  // Исключения для Next.js App Router
  {
    files: ['src/app/**/*.{ts,tsx}'],
    rules: {
      'import/no-default-export': 'off',
      'import/prefer-default-export': 'error',
    },
  },

  // Исключения для конфигов в корне (next.config.ts, eslint.config.mjs и т.д.)
  {
    files: ['*.{js,mjs,ts}'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
]);

export default eslintConfig;
