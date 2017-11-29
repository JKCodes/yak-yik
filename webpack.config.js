var webpack = require('webpack');
var path = require('path');
require('dotenv').config();

module.exports = {
  
  entry: {
    app: './src/app.js'
  },
  output: {
    filename: 'public/dist/bundle.js',
    sourceMapFilename: 'public/dist/bundle.map'
  },
  devtool: '#source-map',
  plugins: [
    new webpack.EnvironmentPlugin([
      'CLOUDINARY_CLOUDNAME',
      'CLOUDINARY_API_KEY',
      'CLOUDINARY_API_SECRET',
      'CLOUDINARY_UPLOAD_PRESET'
    ])
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}