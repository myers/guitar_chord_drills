path = require("path")

module.exports = {
  entry: "./index.jsx",
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test : /\.jsx?/, loader: "babel" }
    ]
  },
  devtool: "#inline-source-map"
}