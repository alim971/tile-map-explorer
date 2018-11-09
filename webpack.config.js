const path = require('path');

module.exports = {

    devtool: 'source-map',
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    watchContentBase: true
  }
};
