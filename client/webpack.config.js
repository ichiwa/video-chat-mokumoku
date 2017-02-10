var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var path = require('path');

module.exports = {
  entry: './src/main.js',
  cache: true,
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js'],
    root: [ path.resolve(__dirname, './src/js') ],
  },  
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "react", "stage-0", "stage-1", "stage-2", "stage-3"],
          plugins: [
            "transform-object-assign",
            "transform-decorators-legacy",
            "transform-runtime"
          ]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', [ 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss' ])
      },
    ]
  },
  postcss: [ 
    autoprefixer({ browsers: [ 'last 2 versions'  ] }) 
  ],
  plugins: [
    new ExtractTextPlugin('css/main.css', {allChunks: true, disable: false})
  ],	
};
