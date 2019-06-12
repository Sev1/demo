const path = require('path');
//插件plugin是需要引入的，loader不需要
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 单个入口 单个出口
  entry:'./main.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'bundle.js'
  },
  // 多个入口，多个出口
  /*entry:{
    main:'./main.js',
    index:'./src/index.js'
  },
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'[name].js'
  },*/
  module:{
    rules:[
      {
        test:/\.js$/,
        exclude:/node_modules/, //排除依赖
        use:'babel-loader'
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test:/\.less$/,//不要忘记css-loader
        use:['style-loader','css-loader','less-loader']
      }
    ]
  },
  plugins:[
  // 将打包好的bundle.js注入到哪个文件中
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ]
}