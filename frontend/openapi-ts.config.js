import { defineConfig } from '@hey-api/openapi-ts';
import path from 'path';

export default defineConfig({
  input: path.resolve(__dirname, '../config/comunicore-api.yaml'),
  output: 'src/shared/api/generated',
  client: 'fetch',
  plugins: [
    '@hey-api/client-fetch',
    '@hey-api/typescript',
    '@tanstack/react-query',
  ],
});
