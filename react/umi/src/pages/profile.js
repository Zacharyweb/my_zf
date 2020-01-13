/**
 * title: 个人中心
 * Routes:
 *   - ./src/PrivateRoute.js
 */
import React from 'react';
import styles from './profile.css';
import router from 'umi/router'
export default class Profile extends React.Component {
  logout = ()=>{
     localStorage.removeItem('login');
     router.replace({pathname:'/login',state:{from:this.props.location.pathname}});
  }
  render(){
    return (
      <div className={styles.normal}>
        <h1>Page profile1</h1>
        <button onClick={()=>{this.logout()}}>退出登录</button>
      </div>
    );
  }
  
}
