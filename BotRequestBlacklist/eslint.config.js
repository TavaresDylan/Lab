module.exports = [
  {
    extends: [
        'airbnb-base',
        'airbnb-typescript/base'
    ],
    "parserOptions": {
        "project": './tsconfig.json'
    },
      "rules": {
        "quotes": "simple"
      }
  },
];