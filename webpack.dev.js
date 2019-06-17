const merge = require('webpack-merge');
const base = require('./webpack.config.js');
const config = require("./src/config/index.js");

module.exports = merge(base,{
  devtool:'inline-source-map',
  devServer: {
    historyApiFallback: true, //标识任意的404响应都会被替换成index.html
    contentBase: './',
    quiet: false, //显示打包的信息(运行地址，版本信息，打包时间等)
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
});