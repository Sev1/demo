import React from 'react';
// import './test.css';
import './Test.less';
import {post,urls} from '../config'

class Test extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			flag:true
		}
	}
  handleClick(e){
    post(urls.getMessage,{}).then((res)=>{
      console.log("请求成功：",res)
    })
  }
  render(){
  	const {flag} = this.state;
    return <div className={'box'}>
      <p className={'text border'}>test webpackConfigaration in react project</p>
      <p className={`tip ${flag?"border":null}`}>动态添加多个类名（ES6写法）</p>
      <p className={["tip",flag?"border":null].join(' ')}>动态添加多个类名（普通写法）</p>
      <span className={"btn"} onClick={this.handleClick}>请求数据</span>
    </div>
  }
}

export default Test