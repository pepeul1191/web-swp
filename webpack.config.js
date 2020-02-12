const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

var entries = {
  main: ['./resources/entries/index.jsx'],
  // vendors: ['backbone', 'jquery', 'underscore', ],
  // vendors_login: ['jquery', ],
};

var plugins = [
  new webpack.ProvidePlugin({
    // import globally this libs
    /*'$': 'jquery',
    'Backbone': 'backbone',
    '_': 'underscore',*/
    '$': 'jquery',
    'React': 'react',
    'ReactDOM': 'react-dom',
    'axios': 'axios',
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].css',
    chunkFilename: '[id].css'
  }),
];

var outputDevelopment = {
  path: path.resolve(__dirname, 'public/dist'),
  filename: '[name].js',
};

var outputProduction = {
  path: path.resolve(__dirname, 'public/dist'),
  filename: '[name].min.js',
};

var rules =  [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    include: path.resolve(__dirname, 'resources'),
    use: {
      loader: 'babel-loader'
    },
  },
  {
    test: /\.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          // you can specify a publicPath here
          // by default it use publicPath in webpackOptions.output
          publicPath: '../'
        }
      },
      'css-loader'
    ]
  },
];

var optimization = {
  splitChunks: {
    cacheGroups: {       
      vendor: {
        test: /node_modules/,
        name: 'vendors',
        chunks: 'all', 
        enforce: true
      }
    }
  }
};

var devServer = {
  host: '0.0.0.0',
  port: 8080,
  contentBase: [
    path.join(__dirname, 'public'),
  ],
  publicPath: path.join(__dirname, 'resources'),
  writeToDisk: true,
  compress: true,
  watchContentBase: true,
  hot: true,
  inline:true,
  allowedHosts: [
    'host.com',
    '*',
  ],
  headers: {
    'Server': 'Ubuntu',
  },
};

var config = {
  entry: entries,
  plugins: plugins,
  optimization: optimization,
  module: {
    rules: rules,
  },
  devServer: devServer,
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.output = outputDevelopment;
    config.watch = true;
  }
  if (argv.mode === 'production') {
    config.output = outputProduction;
    config.watch = false;
    config.devServer = {};
  }
  return config;
};