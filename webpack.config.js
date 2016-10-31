module.exports = {
  entry: './src/index.jsx',

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
        test: /\.jsx$/,
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