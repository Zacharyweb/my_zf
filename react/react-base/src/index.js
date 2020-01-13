import React from 'react';
import ReactDom from 'react-dom';
import store,{persistor} from './store'
import {Provider} from './react-redux';
import Counter1 from './components/Counter/Counter1'
import Counter2 from './components/Counter/Counter2'
import {PersistGate} from './react-persist/integration/react';
// import { createSelector }  from 'reselect'
class Page extends React.Component{

   render(){
      return (
            <Provider store={store}>
               <PersistGate persistor={persistor}>
                  <Counter1></Counter1>
                  <Counter2></Counter2>
               </PersistGate>
            </Provider> 
      )
   }
}

// function createSelector(selector,selectorCb){
//    let oldVal;
//    let value;
//    return function(state){
//       let newVal = selector(state);
//       if(oldVal != newVal){
//          oldVal = newVal;
//          value =  selectorCb(newVal);
//       }
//       return value;

//    }

// }
// let state = {
//    counter:{
//       number:1
//    }
// };


// let counterSelector = state => state.counter; 
// let getCounterSelector = createSelector(counterSelector,(counter)=>{
//    console.log('数据更新了')
//    return counter.number;
// });

// console.log(getCounterSelector(state));
// console.log(getCounterSelector(state));
// state = {counter:{number:6}}
// console.log(getCounterSelector(state));




let el3 = <Page></Page>;
ReactDom.render(el3,document.getElementById('root'));