import { join } from 'path';

const SRC_DIR = join(__dirname, '/client');
const DIST_DIR = join(__dirname, '/public');

export const entry = `${SRC_DIR}/index.jsx`;
export const output = {
  filename: 'bundle.js',
  path: DIST_DIR,
};
export const module = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
  ],
};
export const resolve = {
  extensions: ['.js', '.jsx'],
};
