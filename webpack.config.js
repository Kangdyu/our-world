const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',

  entry: {
    main: './src/index.tsx',
  },

  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist'),
  },

  devtool: isDevelopment ? 'inline-source-map' : undefined,

  devServer: isDevelopment
    ? {
        port: 3000,
        hot: true,
        overlay: true,
        stats: 'errors-only',
      }
    : undefined,

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: 3,
                    targets: '> 0.25%, not dead',
                  },
                ],
                ['@babel/preset-react', { runtime: 'automatic' }],
              ],
              plugins: [
                isDevelopment && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),

  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
};
