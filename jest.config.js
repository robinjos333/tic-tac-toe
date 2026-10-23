export default {
  // 1. Tells Jest to simulate a web browser environment
  testEnvironment: "jsdom",

  // 2. Tells Jest to use babel-jest to compile JSX/ES modules before running tests
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },

  // 3. Optional: Automatically injects jest-dom matchers (like .toBeInTheDocument()) before tests run
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
