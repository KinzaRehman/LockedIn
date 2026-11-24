// Defines the JavaScript and React checks used by npm run lint. Generated build files are ignored.
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Vite generates this folder when we build. Lint the source files we actually edit.
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      // Start with JavaScript's recommended checks, then add the rules for
      // how React hooks are called and how Vite reloads components during development.
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      // Let ESLint recognize browser globals like window and localStorage.
      globals: globals.browser,
      // Allow component markup like <Dashboard /> inside JavaScript.
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
