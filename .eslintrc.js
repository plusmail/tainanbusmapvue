module.exports = {
    root: true,
    env: {
        node: true,
    },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@babel/eslint-parser",
        ecmaVersion: 2020,
        sourceType: "module",
        requireConfigFile: false,
        babelOptions: {
            presets: ["@babel/preset-env"],
        },
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-recommended"
    ],
    rules: {}
};
