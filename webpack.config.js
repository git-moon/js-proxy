const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  name: 'js-proxy',
  mode: 'development',
  devtool: 'eval',
  resolve: {
    extensions: ['.js']
  },
  entry: {
    app: ['./index']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              targets: {
                browsers: ['> 5% in KR']
              },
              debug: true
            }]
          ]
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'app.css' })
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
    // publicPath: '/assets'
  },
  // devServer: {
  //   devMiddleware: { publicPath: '/assets' },
  //   static: { directory: path.resolve(__dirname) },
  //   hot: true
  // }
}