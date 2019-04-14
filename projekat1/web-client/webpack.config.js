const path = require('path');

module.exports = {
  entry: './src/app.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: [
      path.join(__dirname, "src"),
      path.join(__dirname, "src/assets"),
      path.join(__dirname, "src/public/start"),
      path.join(__dirname, "src/public/user"),
      path.join(__dirname, "src/public/error"),
      path.join(__dirname, "src/public/register"),
      path.join(__dirname, "src/public/login"),
    ],
    port: 8080,
    historyApiFallback: {
      rewrites: [
        { from: /./, to: '/index.html' },
      ]
    },
    watchContentBase: true
  }
};