const path = require('path');
const webpack = require('webpack');
//插件plugin是需要引入的，loader不需要
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// 如果使用css进行开发可以进行配置，若使用less/sass，则没必要配置
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require("./src/config/index.js");
const copyWebpackPlugin = require('copy-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin'); //报错：CleanWebpackPlugin is not a constructor；
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin; //版本为3.0.0
module.exports = {
  entry:{
    main:'./main.js'
  },
  plugins:[
  // 输出管理，指定打包的文件，生成新的index.htnl,并将bundle.js注入其中
    new HtmlWebpackPlugin({
      template:'./index.html',
      // filename:'index.html',
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
    new CleanWebpackPlugin(),//每次打包时清除旧的包-最好放在webpack.prod.js中
    /*new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name]_[hash].css',
      chunkFilename: 'css/[name]_[hash].chunk.css',
    }),*/
    // new webpack.HashedModuleIdsPlugin(),  //使缓存的vendor哈希值不变
  ],
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'[name].bundle.js',
    // publicPath:'/' //开发-'/',生产-'./' 打包后静态资源（如bundle.js）相对于index.html的位置。
    //html-webpack-plugin 生成index.html时，publicPath是可以不用配置的。
    // 不设置时：index.html中引入的文件是这样的：<script type="text/javascript" src="main.bundle.js"></script>，打开页面http://localhost:8088；设置publicPath:'/test/'，则<script type="text/javascript" src="/test/main.bundle.js"></script>，打开页面http://localhost:8088/test/
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
        /*use:[
          {
            loader:MiniCssExtractPlugin.loader,
            options:{
              filename:'[name].css',
              chunkFilename:'[name].css',
              // publicPath:'../'   //最后打包时替换引入文件路径
            }
          },
          {
            loader:'css-loader',
            options:{
              importLoaders: 2   //该方式可以让@import引入的css文件再次执行一边css打包loader
            }
          }
        ]*/
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
  
  // 端口和热更新等可以在package.json文件中配置，也可以在这里配置
  // webpack默认的配置文件是webpack.config.js,如果我们的配置文件名为webpack.config.js，则不需要在package.json中指定配置文件--config webpack.config.js
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
        // contentBase: "./",    //告诉服务器从哪里提供内容，即运行时打开哪个文件；默认是当前执行的目录，即会在当前目录（根目录）下查找index.html文件；指的是不是由webpack打包生成的静态文件；
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
        proxy: {                 // 设置代理-解决跨域
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
        sourceMap: true,   //压缩源码，去掉空格等
        uglifyOptions: {
         ie8: true,
        }
         })
      ],
    splitChunks: {   //js代码分割，以及防止重复
      chunks: 'all',
      // chunks: 'async', // async表示只对异步代码进行分割
      minSize: 30000,  // 当超过指定大小时做代码分割
      // maxSize: 200000,  // 当大于最大尺寸时对代码进行二次分割
      minChunks: 1,
      automaticNameDelimiter: '_',
      name:true,
      cacheGroups: {  // 缓存组：如果满足vendor的条件，就按vender打包，否则按default打包
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 权重越大，打包优先级越高
          // filename: 'js/vender.js'  //将代码打包成名为vender.js的文件
          name: 'vender'
        },
        default: {
          minChunks: 2,
          priority: -20,
          name: 'common',
          // filename: 'js/common.js',
          reuseExistingChunk: true // 是否复用已经打包过的代码
        }
      }
    },
   }
}