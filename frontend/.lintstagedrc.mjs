const isWindows = process.platform === 'win32';

const config = {
  '**/*.ts?(x)': isWindows
    ? ['eslint --fix', 'prettier --write', () => 'pnpm typecheck']
    : ['eslint --fix', 'prettier --write', 'tsc-files --noEmit'],

  '*': 'prettier --write --ignore-unknown',
};

export default config;
