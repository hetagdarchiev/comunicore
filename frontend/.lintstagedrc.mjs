const config = {
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],

  '*': 'prettier --write --ignore-unknown',
};

export default config;
