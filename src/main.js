// entry.js
import React from 'react';
import ReactDom from 'react-dom';
import Test from './components/Test.js';
/*const render = (component)=>{
  ReactDom.render(<component />,document.getElementById('root'))
}
render(Test);*/
ReactDom.render(<Test />,document.getElementById('root'))