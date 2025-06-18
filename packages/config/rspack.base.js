const path = require('node:path');
const rspack = require('@rspack/core');
require('dotenv').config();
const { ProgressPlugin } = require('@rspack/core');

module.exports = ({
  appDir,
  port,
  mode = 'development',
  extraAliases = {},
}) => ({
  mode,
  entry: path.resolve(appDir, 'src/index.tsx'),
  output: {
    path: path.resolve(appDir, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'builtin:swc-loader',
        exclude: /node_modules/,
        include: [
          path.resolve(appDir, 'src'),
          path.resolve(appDir, '../../packages/components/src'),
          path.resolve(appDir, '../../packages/core/src'),
        ],
        options: {
          jsc: {
            parser: { syntax: 'typescript', tsx: true },
            transform: {
              react: {
                runtime: 'automatic',
                development: mode === 'development',
              },
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: path.resolve(appDir, 'public/index.html'),
    }),
    new rspack.DefinePlugin({
      'process.env.REACT_APP_API_URL': JSON.stringify(
        process.env.REACT_APP_API_URL,
      ),
      'process.env.REACT_APP_ENV': JSON.stringify(process.env.REACT_APP_ENV),
    }),
    new ProgressPlugin(),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@components': path.resolve(appDir, '../../packages/components/src'),
      '@core': path.resolve(appDir, '../../packages/core/src'),
      ...extraAliases,
    },
    modules: [path.resolve(appDir, 'node_modules'), 'node_modules'],
  },
  devtool: 'eval-cheap-module-source-map',
  target: 'web',
  stats: {
    colors: true,
    children: true,
  },
  devServer: {
    hot: true,
    port,
    historyApiFallback: true,
    open: true,
  },
});
