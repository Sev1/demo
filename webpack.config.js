const path = require('path');
//插件plugin是需要引入的，loader不需要
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const config = require("./src/config/index.js");

module.exports = {
  // 单个入口 单个出口
  entry:'./main.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'bundle.js',
    // publicPath:'./'
  },
  // 多个入口，多个出口
  /*entry:{
    main:'./main.js',
    index:'./src/index.js',
    vendors:['jquery','moment'] //需要打包的第三方插件
  },
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'[name].js'
  },*/
  module:{
    rules:[
      {
        test:/\.(js|jsx)$/,
        exclude:/node_modules/, //排除依赖
        use:'babel-loader'
      },
      /*{
        test:/\.(js|jsx)$/,
        exclude:/node_modules/,
        use: {
         loader: 'babel-loader',
         options: {
          presets: ['@babel/preset-env'],
          plugins: [
           ['@babel/plugin-transform-runtime'],
           [
          // 为了兼容IE8才用了这个插件
          // 没有IE8兼容需求的可以把这个插件去掉
          '@babel/plugin-transform-modules-commonjs'
           ]
          ]
         }
        }
      },*/
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test:/\.less$/,//不要忘记css-loader
        use:['style-loader','css-loader','less-loader']
      },
      {
        test:/\.(png|jpe?g|gif|svg)$/,
        use:'url-loader'
      },
      /*{
        test:/\.jsx$/,
        exclude:/node_modules/,
        use:'es3ify-loader'
      }*/
    ]
  },
  plugins:[
  // 输出管理，指定打包的文件，生成新的index.htnl,并将bundle.js注入其中
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
  ],
  // 设置代理-解决跨域
  // 端口和热更新等已经在package.json文件中配置，也可以在这里配置
  // 如果是用脚手架搭建的项目，有webpack.dev.config.js,则在这个文件下添加以下配置
  devServer: {
        historyApiFallback: true, //标识任意的404响应都会被替换成index.html
        contentBase: "./",
        quiet: false, //显示打包的信息(运行地址，版本信息，打包时间等)
        // noInfo: false,
        hot: true, //开启热点
        inline: true, //开启页面自动刷新
        lazy: false, //不启动懒加载
        // progress: true, //显示打包的进度
        watchOptions: {
            aggregateTimeout: 300 //设置监听等待的时间
        },
        port: '8088', //设置端口号
        proxy: {
            '/api': {
                target:config.baseURL,
                changeOrigin:true
            }
        }
    },
  /*devServer:{
    proxy:{
      '/api':{
        target:config.baseURL,  //要代理的域名，即接口地址
        // secure:false,       //https请求时需要加这个
        changeOrigin:true,     //如果接口跨域，需要配置这个参数
        pathRewrite:{        //接口需要重写的配置这个
          '^/api':'/api'       //接口里有/api（ http://XX.XX.XX.XX:8083/api/login）
          // '^/api':''        // 接口里没有/api（http://XX.XX.XX.XX:8083/login）
        }
      }
    },*/
    //标识任意的404响应都会被替换成index.html
    /*historyApiFallback:true,
    // 不同页面响应不同404
    historyApiFallback:{
      rewrites:[
        {from:/^\/$/,to:'./src/404.html'},
        {from:/./,to:'./static/404.html'},
      ]
    }
  },*/
  optimization: {
    minimizer: [
       new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
         ie8: true,
        }
         })
      ]
   }
}