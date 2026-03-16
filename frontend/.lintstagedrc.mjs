const isWindows = process.platform === 'win32';

const config = {
  // На Linux/macOS: tsc только по изменённым файлам через @jonasgeiler/tsc-files
  // На Windows: полный typecheck по всему проекту (tsc-files глючит с pnpm+win)
  '**/*.ts?(x)': isWindows
    ? ['eslint --fix', 'prettier --write', () => 'pnpm typecheck']
    : ['eslint --fix', 'prettier --write', 'tsc-files --noEmit'],

  '*': 'prettier --write --ignore-unknown',
};

export default config;
