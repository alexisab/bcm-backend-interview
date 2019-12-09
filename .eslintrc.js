const rules = {
    indent: [
        'error',
        4,
        {
            SwitchCase: 1,
        },
    ],

    'linebreak-style': ['error', 'unix'],

    quotes: [
        'error',
        'single',
        {
            avoidEscape: true,
            allowTemplateLiterals: false,
        },
    ],

    semi: ['error', 'never'],
    'no-console': 0,
    'comma-dangle': ['error', 'always-multiline'],
}

module.exports = {
    extends: 'eslint:recommended',

    parserOptions: {
        ecmaVersion: 10,

        ecmaFeatures: {
            impliedStrict: true,
        },

        sourceType: 'module',
    },

    globals: {
        Map: true,
        Promise: true,
    },

    env: {
        node: true,
    },

    rules,
}
