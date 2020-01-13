import React, { Component } from 'react'
import { connect } from 'dva';
class componentName extends Component {
  render() {
    return (
      <div>
        {this.props.title}
      </div>
    )
  }
}
export default connect(state=>state.home)(componentName);