module.exports = {
    extends: [
        // Add your preferred ESLint configurations, e.g., "eslint:recommended"
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    settings: {
        react: {
            version: "detect"
        }
    },
    plugins: ["react", "react-hooks", "@typescript-eslint", "jest"],
    env: {
        browser: true,
        es6: true,
        jest: true
    },
    rules: {
        "react/display-name": "off",
        "react/react-in-jsx-scope": "off",
        "jest/noConditionalExpect": "off" // or use 0 instead of "off"
        // Add any other rules you'd like to apply to your project.
    }
};
