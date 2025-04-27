export default {
    env: {
      browser: true,
      es2021: true,
      node: true,
      cypress: true,
      jest: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
    ],
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      }
    },
    plugins: [
      'react',
    ],
    rules: {
      // customize your rules
      'react/react-in-jsx-scope': 'off', // because Vite + new React doesn't require import React
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
  };
  