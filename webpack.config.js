
var webpack = require('webpack');

const nodeconfig = {
  target: 'node', //default is web
  mode: 'none',
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
    libraryTarget: 'umd', 
	  library: 'otp'
  },
  module: {
  },
  plugins: [
    new webpack.BannerPlugin('基于时间的动态码')
  ]
};
const webconfig = {
  entry: './src/index.js',
  mode: 'none',
  output: {
    path: __dirname + '/dist',
    filename: 'index.web.js',
    libraryTarget: 'umd',
	  library: 'otp' 
  },
  module: {
  },
  plugins: [
    new webpack.BannerPlugin('基于时间的动态码')
  ]
};

module.exports = [nodeconfig, webconfig]
