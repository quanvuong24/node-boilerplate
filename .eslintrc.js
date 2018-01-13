module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb-base",
    "env": {
        "browser": true,
        "node": true,
        "shared-node-browser": true,
        "jest": true,
        "es6": true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
    },
    "rules": {
        "linebreak-style": 0,
        "arrow-parens": [
            "error",
            "always"
        ],
        "arrow-body-style": [
            2,
            "as-needed"
        ],
        "comma-dangle": [
            2,
            "always-multiline"
        ],
        "import/imports-first": 0,
        "import/newline-after-import": 0,
        "import/no-dynamic-require": 0,
        "import/no-extraneous-dependencies": 0,
        "import/no-named-as-default": 0,
        "import/no-unresolved": 2,
        "import/prefer-default-export": 0,
        "indent": [
            2,
            2,
            {
                "SwitchCase": 1
            }
        ],
        "max-len": 0,
        "newline-per-chained-call": 0,
        "no-confusing-arrow": 0,
        "no-console": 1,
        "no-use-before-define": 0,
        "no-case-declarations": 0,
        "prefer-template": 2,
        "class-methods-use-this": 0,
    },
}
