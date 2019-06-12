import React from 'react';
import style from './test.css';

class Test extends React.Component{

  render(){
    return <div className={style['box']}>
      <p>test webpackConfigaration in react module</p>
    </div>
  }
}

export default Test