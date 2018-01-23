module.exports = {
  verbose: true,
  setupFiles: [
    "./utils/tests/shims.js",
    "./utils/tests/setupEnzyme.js",
    "./utils/tests/disableStyleWarnings.js"
  ],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  moduleNameMapper: {
    "\\.(jpg|png|gif)$": "<rootDir>/utils/tests/fileMock.js",
    "\\.(css|less)$": "identity-obj-proxy",
    "^shared/(.*)$": "<rootDir>/shared/$1"
  },
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!.eslintrc.js",
    "!*.config.js",
    "!preview/**",
    "!coverage/**",
    "!utils/tests/**"
  ]
};
