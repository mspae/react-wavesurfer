module.exports = {
  extends: ['eslint:recommended', 'prettier/react', 'plugin:react/recommended'], // extending recommended config and config derived from eslint-config-prettier
  plugins: ['prettier'], // activating esling-plugin-prettier (--fix stuff)
  parser: "babel-eslint",
  globals: {
    WaveSurfer: true
  },
  env: {
    browser: true,
    commonjs: true
  },
  rules: {
    'prettier/prettier': [ // customizing prettier rules (unfortunately not many of them are customizable)
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
      },
    ],
    eqeqeq: ['error', 'always'], // adding some custom ESLint rules
  },
};