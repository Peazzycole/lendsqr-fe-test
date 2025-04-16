/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jest-environment-jsdom",
  preset: "ts-jest",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
    "\\.(png|jpe?g|gif|svg|eot|otf|webp|ttf|woff2?)$":
      "<rootDir>/__mocks__/fileMock.ts",
    "^lottie-react$": "<rootDir>/__mocks__/lottie-react.tsx",
  },
  setupFiles: ["<rootDir>/jest.setup.ts"],
};
