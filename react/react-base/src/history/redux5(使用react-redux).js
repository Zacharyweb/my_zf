import React from 'react';
import ReactDom from 'react-dom';
import store from './store'
import {Provider,connect} from './react-redux';
import * as types from './store/type';
import actions from './store/actions'
class Counter extends React.Component{
   render(){
      return (
         <>
            <div style={{'border':'1px solid blue'}}>{this.props.counter1.number}</div>
            <button onClick={this.props.increment1}>+</button>
            <button onClick={this.props.decrement1}>-</button>
            <div style={{'border':'1px solid blue'}}>{this.props.counter2.number}</div>
            <button onClick={this.props.increment2}>+</button>
            <button onClick={this.props.decrement2}>-</button> 
         </>
      )
   }
}

let mapStateToProps = state => state
let mapDispatchToProps = dispatch => ({
   increment1(){
      dispatch({type:types.INCREMENT1,payload:2});
   },
   decrement1(){
      dispatch({type:types.DECREMENT1,payload:2});
   },
   increment2(){
      dispatch({type:types.INCREMENT2,payload:2});
   },
   decrement2(){
      dispatch({type:types.DECREMENT2,payload:2});
   },
});
// let Panel = connect(mapStateToProps,mapDispatchToProps)(Counter);
let Panel = connect(mapStateToProps,actions)(Counter);

class Page extends React.Component{
   render(){
      return (
            <Provider store={store}>
              <Panel></Panel>
            </Provider> 
      )
   }
}

let el3 = <Page></Page>;

ReactDom.render(el3,document.getElementById('root'));
