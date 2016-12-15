module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.js'
  },

  devtool: 'eval-source-map',

  node: {
    fs: "empty"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
};
