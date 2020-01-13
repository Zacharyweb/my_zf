import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from './redux';
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
function reducer(state=0,action){
   switch(action.type){
      case INCREMENT:
         return state + action.payload;
      case DECREMENT:
         return state - action.payload;
      default:
         return state;
   }
}
let store = createStore(reducer);

function increment(){
   return {type:INCREMENT,payload:2}
};
function decrement(){
   return {type:DECREMENT,payload:2}
};

function bindActionCreator(actionCreate,dispatch){
   return function(){
      return dispatch(actionCreate());
   } 
}
function bindActionCreators(actionCreators,dispatch){
   if(typeof actionCreators === 'function'){
      return bindActionCreator(actionCreators,dispatch)
   }
   const boundActionCreators = {};
   for(let key in actionCreators){
      const actionCreator = actionCreators[key];
      if(typeof actionCreator === 'function'){
         boundActionCreators[key] = bindActionCreator(actionCreator,dispatch);
      }
   }
   return boundActionCreators;
};

let actions = {increment,decrement};

const boundIncrement = bindActionCreators(increment,store.dispatch);
const boundDecrement = bindActionCreators(decrement,store.dispatch);
// const boundActions = bindActionCreators(actions,store.dispatch);

class Panel extends React.Component{
   constructor(props){
      super(props);
      this.state = {value:store.getState()};
   }
   componentDidMount(){
      this.unSubscribe = store.subscribe(()=>{
         this.setState({
            value:store.getState()
         })
      })  
   }
   componentWillUnmount(){
      this.unSubscribe();
   }
   render(){
      return (
         <>
           <div style={{'border':'1px solid blue'}}>{this.state.value}</div>
           <button onClick={boundIncrement}>+</button>
           <button onClick={boundDecrement}>-</button>

         </>
      )
   }
}

let el3 = 
  <Panel></Panel>
;

ReactDom.render(el3,document.getElementById('root'));
