import React from 'react';
import ReactDom from 'react-dom';
import store from './store'
import {Provider} from './react-redux';
import Counter1 from './components/Counter/Counter1'
import Counter2 from './components/Counter/Counter2'

class Page extends React.Component{

   render(){
      return (
            <Provider store={store}>
              <Counter1></Counter1>
              <Counter2></Counter2>
            </Provider> 
      )
   }
}

let el3 = <Page></Page>;
ReactDom.render(el3,document.getElementById('root'));