module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'next/core-web-vitals',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/strict',
      ],
      rules: {
        '@typescript-eslint/strict-boolean-expressions': 1,
      },

      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
  ignorePatterns: ['*.typegen.ts', 'src/types/supabase.ts'],
};
