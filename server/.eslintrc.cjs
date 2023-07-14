module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: [
        "airbnb-base",
        "airbnb-typescript/base"
    ],
    overrides: [],
    ignorePatterns: [
        ".eslintrc.cjs"
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname
    },
    rules: {
        "import/prefer-default-export": "off"
    }
};