const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname + '/build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './build',
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader', 'eslint-loader']
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    },
    {
      test: /\.(png|jpg|jpeg|svg|ttf)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 25000,
          name: "[name].[ext]",
        },
      },
    },
    ]
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./index.html'),
    })
  ],
};
