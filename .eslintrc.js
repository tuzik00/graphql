module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    schema: [
      "./src/graphql/*.graphql",
      "./src/modules/**/typeDefs/*.graphql"
    ]
  },
  plugins: [
    '@typescript-eslint/eslint-plugin'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
  overrides: [
    {
      files: ["*.graphql"],
      extends: "plugin:@graphql-eslint/schema-recommended",
      rules: {
        "spaced-comment": "off",
        "@graphql-eslint/no-unreachable-types": "off",
        "@graphql-eslint/strict-id-in-types": "off",
        "@graphql-eslint/known-argument-names": "off"
      }
    },
  ]
};
