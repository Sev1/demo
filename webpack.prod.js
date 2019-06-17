const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(base,{
  devtool:'source-map',
  plugins:[
    // new CleanWebpackPlugin(['dist']),//每次打包时清除旧的包
    /*new UglifyJsPlugin({
      sourceMap:true //调试
    }),*/
    /*new webpack.DefinePlugin({//一些 library 可能针对具体用户的环境进行代码优化
      'process.env.NODE_ENV':JSON.stringify('production')
    }),*/
    new copyWebpackPlugin([//必须为数组
      {
        from:path.resolve(__dirname+'/static'),
        to:'static',
        ignore: ['.*']
      }
    ])
  ]
})