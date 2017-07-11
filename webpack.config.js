var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash     : false,
      // favicon  : '',
      filename : 'index.html',
      inject   : 'body',
      minify   : {
        collapseWhitespace : true
      }
    }),
    // new webpack.HotModuleReplacementPlugin() // Enable HMR
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // devServer: {
  //   hot: true, // Tell the dev-server we're using HMR
  //   contentBase: path.resolve(__dirname, 'dist'),
  //   publicPath: '/'
  // },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};
