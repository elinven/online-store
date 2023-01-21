const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const baseConfig = {
  entry: path.resolve(__dirname, './src/index'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        type: 'asset/resource',
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(jpe?g|png|webp|gif|svg|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name][ext]'
       }
      },
      { test: /\.ts$/i, use: 'ts-loader' },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      favicon: "./src/assets/ico/favicon.ico"
    }),
    new CleanWebpackPlugin(),
    new EslingPlugin({ extensions: 'ts' }),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css'
    })
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};