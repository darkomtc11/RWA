const path = require('path');

module.exports = {
  entry: './src/index.ts',
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
      path.join(__dirname, "src/public/views/root"),
      path.join(__dirname, "src/public/views/start"),
      path.join(__dirname, "src/public/views/user"),
      path.join(__dirname, "src/public/views/error"),
      path.join(__dirname, "src/public/views/register"),
      path.join(__dirname, "src/public/views/login"),
      path.join(__dirname, "src/public/fraction-views"),
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