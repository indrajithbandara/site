const PATH = require('path');

module.exports = {
    extends: '@gik/node',
    rules: {
        'import/no-dynamic-require': 'off',
        'import/no-names-as-default-member': 'off'
    },
    settings: {
        'import/resolver': {
            node: {
                paths: [
                    PATH.join(__dirname, 'out'),
                    PATH.join(__dirname, 'src'),
                ]
            }
        }
    }
}
