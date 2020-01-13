import React from 'react';
import Link from 'umi/link';
import style from  './index.css';
export default class Layout extends React.Component{
      render(){
          return (
              <>
                <nav className={style.nav}>
                    <Link to="/">首页</Link>
                    <Link to="/user">用户</Link>
                    <Link to="/profile">个人中心</Link>
                </nav>
                <div className={style.content}>
                    {this.props.children}
                </div> 
              </> 
          )
      }
}