module.exports = {
    env: {
        commonjs: true,
        node: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        'prettier/prettier': 'error',
        'no-unused-vars': 0,
    },
};
