const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const libraryName = 'ko-unload-check';
const plugins = [];

module.exports = env => {
  let outputFile;
  let entryFile;
  let devTool;

  switch (env.WEBPACK_ENV) {
    case 'build':
      const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
      const ugligyPlugin = new UglifyJsPlugin({ minimize: true });
      const cleanPlugin = new CleanWebpackPlugin(['dist']);
      plugins.push(ugligyPlugin, cleanPlugin);
      entryFile = './src/index.js';
      outputFile = `${libraryName}.min.js`;
      break;
    case 'build-debug':
      entryFile = './src/index.js';
      outputFile = `${libraryName}.debug.js`;
      break;
    case 'dev':
      plugins.push(new HtmlWebpackPlugin({ template: __dirname + '/src/index.html' }))
      devTool: 'source-map';
      entryFile = './src/indexVM.js';
      outputFile = `${libraryName}.dev.js`;
      break;

    default:
      break;
  }

  const config = {
    entry: entryFile,
    devtool: devTool,
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

  return config;
}