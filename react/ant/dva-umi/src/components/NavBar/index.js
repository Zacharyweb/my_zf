import styles from './index.less';
import {Link} from 'dva/router';
import React, { Component } from 'react';
import {Layout,Menu} from 'antd';
let logo = require('../../assets/yay.jpg');
export default class NavBar extends Component {
  render() {
    return (
      <Layout.Header className={styles.header}>
        <img src={logo}/>
        <Menu  className={styles.menu} mode="horizontal" selectedKeys={[this.props.location.pathname]} >
            <Menu.Item key="/home"><Link to="/home">主页</Link></Menu.Item>
            <Menu.Item key="/user"><Link to="/user">用户管理</Link></Menu.Item>
            <Menu.Item key="/profile"><Link to="/profile">个人中心</Link></Menu.Item>
            <Menu.Item key="/login"><Link to="/login">登录</Link></Menu.Item>
            <Menu.Item key="/register"><Link to="/register">注册</Link></Menu.Item>
        </Menu>
      </Layout.Header> 
    )
  }
}
