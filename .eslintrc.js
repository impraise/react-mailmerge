module.exports = {
  extends: [
    "standard",
    "prettier",
    "plugin:react/recommended",
    "plugin:jest/recommended"
  ],
  plugins: ["prettier", "react", "jest"],
  rules: {
    strict: 0,
    "prettier/prettier": "error"
  },
  parser: "babel-eslint",
  env: {
    "jest/globals": true
  }
};
