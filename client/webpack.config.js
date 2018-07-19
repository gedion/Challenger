
const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: {
    app: ['babel-regenerator-runtime',
      './src/app.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.map'
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  devtool: '#source-map',
  devServer: {
    port: 10443,
    host: '0.0.0.0',
    https: true,
    contentBase: path.join(__dirname, 'build'),
    hot: false,
    historyApiFallback: {
      index: '/'
    },
    disableHostCheck: true,
    clientLogLevel: 'info'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['react', 'latest'],
          plugins: [
            'transform-object-rest-spread'
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
        ]  
      }, 
      {
        enforce: 'pre',
        test: /\.js*/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
