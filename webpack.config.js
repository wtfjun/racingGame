var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: "./public/javascripts/main.js",

  output: {
      path:'./public/javascripts/',
      filename: 'index.js',
   },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.(css|less)$/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      },
      { test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?limit=10000&name=./images/[name].[ext]'
      }
    ]
  },

  watch: true
};
