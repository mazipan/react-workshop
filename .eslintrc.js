module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ['airbnb', 'prettier'],
  rules: {
    'import/order': 0,
    'import/no-dynamic-require': 0,
    'arrow-body-style': 0,
    'no-nested-ternary': 0,
    'react/jsx-filename-extension': 0,
    'no-underscore-dangle': 0,
    'react/no-danger': 0,
    'react/react-in-jsx-scope': 0,
    'react/forbid-prop-types': 0,
  },
};
