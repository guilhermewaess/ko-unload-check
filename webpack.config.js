const env = process.env.WEBPACK_ENV;

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const libraryName = 'ko-unload-check';
const plugins = [new HtmlWebpackPlugin({ template: __dirname + '/src/index.html' })];

let outputFile;

if (env === 'build') {
  const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  entry: './src/index.js',
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

const config = {
  entry: './src/indexVM.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /(\.html)$/,
        loader: 'html-loader',
        exclude: /node_modules/
      },
      // {
      //   test: /(\.js)$/,
      //   loader: "eslint-loader",
      //   exclude: /node_modules/
      // }
    ]
  },
  plugins
};

module.exports = config;