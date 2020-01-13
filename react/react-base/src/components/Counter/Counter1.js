import React from 'react';
import actions from '../../store/actions'
import {connect} from '../../react-redux/index';
class Counter1 extends React.Component{
   render(){
       console.log('render Counter1');
       return (
            <>
                <div style={{'border':'1px solid blue'}}>{this.props.number}</div>
                <button onClick={this.props.increment1}>+</button>
                <button onClick={this.props.decrement1}>-</button>
                <button onClick={this.props.asyncIncrement1}>async+</button>
                <button onClick={this.props.promiseIncrement1}>promise+</button>

             </>
       )
   }
}
let mapStateToProps = state => state.counter1
let Panel1 = connect(mapStateToProps,actions)(Counter1);
export default Panel1;