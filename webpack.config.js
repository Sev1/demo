const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:'./src/main.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'bundle.js'
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        exclude:/node_modules/,
        use:'babel-loader'
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  },
  plugins:[
    // 把打包好的文件注入到哪里
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ]
}