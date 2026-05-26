import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

const browserGlobals = {
  document: 'readonly',
  window: 'readonly',
  localStorage: 'readonly',
  crypto: 'readonly',
  Blob: 'readonly',
  URL: 'readonly',
  setInterval: 'readonly',
  clearInterval: 'readonly',
  setTimeout: 'readonly'
};

const nodeGlobals = {
  console: 'readonly',
  process: 'readonly',
  Buffer: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly'
};

export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'client/dist/**']
  },
  {
    files: ['server/src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: nodeGlobals
    },
    rules: {
      'no-undef': 'error',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    }
  },
  {
    files: ['client/src/**/*.{js,jsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true }
      },
      globals: browserGlobals
    },
    settings: {
      react: { version: 'detect' }
    },
    rules: {
      'no-undef': 'error',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'react/jsx-uses-vars': 'error',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  }
];
