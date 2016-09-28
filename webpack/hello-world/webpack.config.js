module.exports = {
  entry: "./main",
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  watch: true,
  devServer: {
    contentBase: '.'
  },
  resolve: {
    extensions: ['.js', '.ts', '']
  },
  preLoaders: [
    {
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: "tslint"
    }
  ],
  loaders: [
    {test: /\.css$/, loader: 'to-string!css', exclude: /node_modules/},
    {test: /\.css$/, loader: 'style!css', exclude: /src/},
    {test: /\.html$/, loader: 'raw'},
    {test: /\.ts$/, loader: 'ts'}
  ]
};