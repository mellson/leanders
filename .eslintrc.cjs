module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@next/next', '@typescript-eslint'],

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'eslint:recommended',
        'plugin:@next/next/recommended',
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
