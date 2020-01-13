import React from 'react';
import actions from '../../store/actions';
import {connect} from '../../react-redux/index';
class Counter2 extends React.Component{
   render(){
      console.log('render Counter2');
       return (
            <>
                <div style={{'border':'1px solid blue'}}>{this.props.number}</div>
                <button onClick={this.props.increment2}>+</button>
                <button onClick={this.props.decrement2}>-</button>
             </>
       )
   }
}
let mapStateToProps = state => state.counter2
let Panel2 = connect(mapStateToProps,actions)(Counter2);
export default Panel2;