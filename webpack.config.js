const path = require('path');
//插件plugin是需要引入的，loader不需要
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const config = require("./src/config/index.js");
const copyWebpackPlugin = require('copy-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin'); //版本为3.0.0，直接这么引用在plugins中应用时会报错：CleanWebpackPlugin is not a constructor；
// 3.0.0正确引入：const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin; 使用：new CleanWebpackPlugin();不需要传参； 目前发现，不使用这个插件进行多次打包dist下面也不会生产多个bundle.js文件，故可以不用设置；
module.exports = {
  entry:{
    main:'./main.js'
  },
  plugins:[
  // 输出管理，指定打包的文件，生成新的index.htnl,并将bundle.js注入其中
    new HtmlWebpackPlugin({
      template:'./index.html',
      // title:'Production'
      // favicon:'./static/favicon.ico'
      // favicon: path.resolve('./static/favicon.ico')
    }),
    new copyWebpackPlugin([//必须为数组-build时拷贝静态文件
      {
        from:path.resolve(__dirname+'/static'),
        to:'static',
        ignore: ['.*']
      }
    ]),
    // new CleanWebpackPlugin(['dist']),//每次打包时清除旧的包
  ],
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'[name].bundle.js',
    // publicPath:'./' //开发-'/',生产-'./' html-webpack-plugin 生成index.html时，publicPath是可以不用配置的。
    // publicPath: process.env.NODE_ENV === 'production'? './': '/'//不生效
  },
  module:{
    rules:[
      {
        test:/\.(js|jsx)$/,
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
      },
      {
        test:/\.(png|jpe?g|gif|svg)$/,
        use:'url-loader'
      },
    ]
  },
  
  // 设置代理-解决跨域
  // 端口和热更新等已经在package.json文件中配置，也可以在这里配置
  // 如果是用脚手架搭建的项目，有webpack.dev.config.js,则在这个文件下添加以下配置
  devServer: {
        historyApiFallback: true, //标识任意的404响应都会被替换成index.html
        /*// 不同页面响应不同404
        historyApiFallback:{
          rewrites:[
            {from:/^\/$/,to:'./src/404.html'},
            {from:/./,to:'./static/404.html'},
          ]
        }*/
        // contentBase: "./",    //开发环境下的可访问文件
        quiet: false,            //显示打包的信息(运行地址，版本信息，打包时间等)
        // noInfo: false,
        hot: true,               //开启热点
        inline: true,            //开启页面自动刷新
        lazy: false,             //不启动懒加载
        // progress: true,       //显示打包的进度
        watchOptions: {
          aggregateTimeout: 300  //设置监听等待的时间
        },
        port: '8088',            //设置端口号
        proxy: {
          '/api':{
            target:config.baseURL,  //要代理的域名，即接口地址
            // secure:false,       //https请求时需要加这个
            changeOrigin:true,     //如果接口跨域，需要配置这个参数
            /*pathRewrite:{        //接口需要重写的配置这个
              '^/api':'/api'       //接口里有/api（ http://XX.XX.XX.XX:8083/api/login）
              // '^/api':''        // 接口里没有/api（http://XX.XX.XX.XX:8083/login）
            }*/
          }
        }
    },
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