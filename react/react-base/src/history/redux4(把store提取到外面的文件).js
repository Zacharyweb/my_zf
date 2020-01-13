import React from 'react';
import ReactDom from 'react-dom';
import store,{boundActions} from './store'
class Panel extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         value1:store.getState().counter1.number,
         value2:store.getState().counter2.number,
      };
   }
   componentDidMount(){
      this.unSubscribe = store.subscribe(()=>{
         this.setState({
            value1:store.getState().counter1.number,
            value2:store.getState().counter2.number
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
