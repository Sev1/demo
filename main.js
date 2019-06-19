// entry.js
import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import Test from './src/components/Test.jsx';
// import './src/less/base.less'
// import './src/less/base.css'
ReactDom.render(<Test />,document.getElementById('root'))

// 入口文件配置接受热更新
/*if (module.hot) {
    module.hot.accept();
}*/