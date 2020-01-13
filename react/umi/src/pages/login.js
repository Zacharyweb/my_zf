import React, { Component } from 'react'
import router from 'umi/router';
export default class componentName extends Component {
    login = () => {
        localStorage.setItem('login', 'true');
        if (this.props.location.state && this.props.location.state.from) {
            router.replace(this.props.location.state.from);
        }
    }
    render() {
        return (
            <button onClick={this.login}>登录</button>
        )
    }
}