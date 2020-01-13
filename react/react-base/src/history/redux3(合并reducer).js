import React from 'react';
import ReactDom from 'react-dom';
import {createStore,bindActionCreators} from 'redux';

const INCREMENT1 = 'INCREMENT1';
const DECREMENT1 = 'DECREMENT1';
const INCREMENT2 = 'INCREMENT2';
const DECREMENT2 = 'DECREMENT2';
function counter1(state=0,action){
   switch(action.type){
      case INCREMENT1:
         return state + action.payload;
      case DECREMENT1:
         return state - action.payload;
      default:
         return state;
   }
};

function counter2(state=0,action){
   switch(action.type){
      case INCREMENT2:
         return state + action.payload;
      case DECREMENT2:
         return state - action.payload;
      default:
         return state;
   }
};
function combineReducers(reducers){
    return function(state={},action){
         let nextState = {};
         for(let key in reducers){
            nextState[key] = reducers[key](state[key],action)
         };
         return nextState;
    }
};

let reducer = combineReducers({counter1,counter2});

let store = createStore(reducer);

function increment1(){
   return {type:INCREMENT1,payload:2}
};
function decrement1(){
   return {type:DECREMENT1,payload:2}
};
function increment2(){
   return {type:INCREMENT2,payload:2}
};
function decrement2(){
   return {type:DECREMENT2,payload:2}
};

let actions = {increment1,decrement1,increment2,decrement2};

// const boundIncrement = bindActionCreators(increment,store.dispatch);
// const boundDecrement = bindActionCreators(decrement,store.dispatch);
const boundActions = bindActionCreators(actions,store.dispatch);
class Panel extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         value1:store.getState().counter1,
         value2:store.getState().counter2,

      };
   }
   componentDidMount(){
      this.unSubscribe = store.subscribe(()=>{
         this.setState({
            value1:store.getState().counter1,
            value2:store.getState().counter2
         })
      })  
   }
   componentWillUnmount(){
      this.unSubscribe();
   }
   render(){
      return (
         <>
           <div style={{'border':'1px solid blue'}}>{this.state.value1}</div>
           <button onClick={boundActions.increment1}>+</button>
           <button onClick={boundActions.decrement1}>-</button>
           <div style={{'border':'1px solid blue'}}>{this.state.value2}</div>
           <button onClick={boundActions.increment2}>+</button>
           <button onClick={boundActions.decrement2}>-</button>

         </>
      )
   }
}

let el3 = 
  <Panel></Panel>
;

ReactDom.render(el3,document.getElementById('root'));
