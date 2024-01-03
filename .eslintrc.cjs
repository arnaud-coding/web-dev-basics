module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["standard", "prettier"],
  overrides: [
    {
      env: {
        node: true
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script"
      }
    }
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  rules: {
    "max-len": ["warn", {
      code: 120,
      comments: 160,
      ignoreStrings: true,
      ignoreTrailingComments: true,
      ignoreUrls: true,
      ignoreTemplateLiterals: true
    }]
  }
};
