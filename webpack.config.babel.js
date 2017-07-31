const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'eval',
  context: path.resolve(__dirname, 'src'),
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:9999',
    'webpack/hot/only-dev-server',
    'index.js',
  ],
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    hot: true,
    contentBase: './',
    compress: true,
    port: 9999,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader',
      },
      {
       test: /\.css$/,
       use: [
         { loader: 'style-loader' },
         {
           loader: 'css-loader',
           options: {
             modules: true
           }
         }
       ]
     }
    ],
  },
  resolve: {
    extensions: ['*', '.jsx', '.js', '.json'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
    }),
  ],
};
