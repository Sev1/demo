import React from 'react';
import './Test.less';
// import '../less/base.css';
// require('../less/base.css');
import {post,urls} from '../config';
import icon from '../../static/img/7.png';
import _icon from '../../static/img/8.png';
import subIcon from './images/1.png';

class Test extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			flag:true
		}
	}
  handleClick(e){
    post(urls.getMessage,{}).then((res)=>{
      console.log("跨域请求成功：",res)
    })
  }
  render(){
  	const {flag} = this.state;
    return <div className={'box'}>
      <p className={'text border'}>
        <img src={subIcon}/>
        webpackConfigaration in react project
      </p>
      <p className={`tip bg ${flag?"border":null}`}>
        {/*<img src={icon}/>*/}
        动态添加多个类名（ES6写法），背景
      </p>
      <p className={["tip",flag?"border":null].join(' ')}>
        <img src={_icon}/>
        动态添加多个类名（普通写法），图片
      </p>
      <span className={"btn"} onClick={this.handleClick}>请求数据</span>
      <p className={'text border'}>is a new p label</p>
    </div>
  }
}

export default Test