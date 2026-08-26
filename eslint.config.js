import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'coverage', 'Assets'] },

  // ---------------------------------------------------------------------------
  // Application source
  // ---------------------------------------------------------------------------
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: { project: './tsconfig.app.json' },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // --- Security rules (PLAN.md B5) -------------------------------------
      // All content is typed TS strings rendered as text. If a description
      // needs paragraph breaks it becomes string[], never HTML.
      'react/no-danger': 'error',
      // Covers referrer leakage as well as the (now browser-implied) noopener.
      'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],

      // --- Dependency direction, rule 1 of 2 (PLAN.md B2) ------------------
      // Expresses the layer boundaries. Cannot express "no sibling features" —
      // that is what no-internal-modules below is for.
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/shared',
              from: './src/features',
              message: 'shared must never import features. Promote the shared part instead.',
            },
            {
              target: './src/shared',
              from: './src/app',
              message: 'shared must never import app.',
            },
            {
              target: './src/content',
              from: './src/features',
              message: 'content is a leaf: it may not import features.',
            },
            {
              target: './src/content',
              from: './src/shared',
              message: 'content is a leaf: it may not import shared.',
            },
            {
              target: './src/content',
              from: './src/app',
              message: 'content is a leaf: it may not import app.',
            },
          ],
        },
      ],

      // --- Dependency direction, rule 2 of 2 (PLAN.md B2) ------------------
      // The enforceable half of "features may not import sibling features".
      // `forbid` (not `allow`) is used deliberately: it polices OUR alias roots
      // and leaves npm subpath imports like 'react-dom/client' alone.
      //   @features/hero        OK   — the barrel
      //   @features/hero/Hero   FAIL — reaching inside a feature
      'import/no-internal-modules': [
        'error',
        { forbid: ['@features/*/**', '@shared/*/**', '@content/*/**'] },
      ],

      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // Features: seal the relative-path loophole. Without this, a sibling feature
  // could be reached as '../products/ProductCard', bypassing the alias forbid
  // list above. Cross-directory imports must go through an alias, which is
  // then policed by no-internal-modules.
  // ---------------------------------------------------------------------------
  {
    files: ['src/features/**/*.{ts,tsx}'],
    rules: {
      'import/no-relative-parent-imports': 'error',
    },
  },

  // ---------------------------------------------------------------------------
  // Tests
  // ---------------------------------------------------------------------------
  {
    files: ['**/*.test.{ts,tsx}', 'tests/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },

  // ---------------------------------------------------------------------------
  // Node-side config files
  // ---------------------------------------------------------------------------
  {
    files: ['*.config.{js,ts}', 'scripts/**/*.mjs'],
    languageOptions: { globals: globals.node },
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },

  prettier,
)
