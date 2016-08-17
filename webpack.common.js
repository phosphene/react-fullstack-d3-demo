/* var path = require('path');
 * var webpack = require('webpack');
 * var cssnext  = require('postcss-cssnext');
 * var postcssReporter = require('postcss-reporter');
 * //import { config, babelConfig } from './package.json';
 * */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var cssnext = require('postcss-cssnext');
var postcssReporter = require('postcss-reporter');
var config = require('./package').config;
var babelConfig = require('./package').babelConfig;

var SRC = path.resolve(__dirname, 'app');
var BUILD = path.resolve(__dirname, 'server/public');
//const SRC = path.resolve(__dirname, 'app');
//const BUILD = path.resolve(__dirname, 'server/public');

module.exports = {
  context: SRC,
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      './client'
    ],
    vendor: ['react', 'react-dom', 'react-router', 'mobx', 'mobx-react', 'mobx-react-devtools']
  },
  output: {
    path: BUILD,
    publicPath: config.assetsPublicPath,
    filename: '[name].bundle.js',
    library: 'store'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: babelConfig.client
    },
     {
      test: /\.css$/,
      loader: 'style!css?modules&localIdentName=[folder]__[local]--[hash:base64:5]&camelCase&importLoaders=1!postcss'
    }, {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'url?name=public/images/[name].[ext]&limit=10000'
    }, {
      test: /\.(ttf|eot|woff2?|otf)$/,
      loader: 'url?name=public/fonts/[name].[ext]&limit=10000'
    }]
  },
  externals: {
    cheerio: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  postcss: () => [
    cssnext({
      browsers: ['last 2 versions', 'IE > 10'],
    }),
    postcssReporter({
      clearMessages: true,
    })
  ],
  devtool: 'inline-source-map',
  watch: true,
  resolve: {
    root: [
      path.resolve(process.cwd(), 'app/shared')
    ],
    extensions: ['', '.js', '.jsx']
  }
}
