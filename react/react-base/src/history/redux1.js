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
           <button onClick={()=>store.dispatch({type:INCREMENT,payload:2})}>+</button>
           <button onClick={()=>store.dispatch({type:DECREMENT,payload:2})}>-</button>

         </>
      )
   }
}

let el3 = 
  <Panel></Panel>
;

ReactDom.render(el3,document.getElementById('root'));
