const path = require('node:path');
const rspack = require('@rspack/core');
require('dotenv').config();
const { ProgressPlugin } = require('@rspack/core');

module.exports = ({
  appDir,
  port,
  mode = 'development',
  extraAliases = {},
  subdomain,
}) => ({
  mode,
  entry: path.resolve(appDir, 'src/index.tsx'),
  output: {
    path: path.resolve(appDir, 'dist'),
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    publicPath: '/',
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
    host: `${subdomain}.denliehoo.localhost`,
    port,
    allowedHosts: 'all', // Allow custom domain in dev
    historyApiFallback: true,
    open: true,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // Define a cache group called 'vendors'
        vendors: {
          // This test selects modules from the node_modules directory
          test: /[\\/]node_modules[\\/]/,

          // The name of the resulting chunk
          name: 'vendors',

          // This setting includes all types of chunks (initial, async, etc.)
          chunks: 'all',
        },
      },
    },
  },
});
