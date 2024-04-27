module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'import'], // Add 'import' plugin
  rules: {
    'prettier/prettier': [
      'error',
      {
        // Override Prettier options here
        bracketSpacing: true,
        ignorePattern: true,
      },
    ],
    'react/prop-types': 'off',
    'react-native/no-inline-styles': 'off',
    'react-native/sort-styles': [
      'error',
      'asc',
      { ignoreClassNames: true, ignoreStyleProperties: true },
    ],
    'import/no-unresolved': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'react-hooks/exhaustive-deps': 'off',
    'no-alert': 'off',
    'react-native/no-unused-styles': 'off',
    'react-native/no-color-literals': 'off',
  },
  settings: {
    'react-native/style-sheet-object-names': [
      'EStyleSheet',
      'StyleSheet',
      'Appearance',
    ],
  },
};
