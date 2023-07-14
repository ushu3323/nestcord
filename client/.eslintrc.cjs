module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        "airbnb",
        "airbnb-typescript",
        "plugin:react/jsx-runtime"
    ],
    ignorePatterns: [
        ".eslintrc.cjs"
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname
    },
    plugins: [
        "react",
        "react-refresh"
    ],
    rules: {
        "react-refresh/only-export-components": "warn",
        "import/extensions": "off"
    }
};