import React from 'react';
import router from 'umi/router'
export default class User extends React.Component {
    render() {
        return (
            <>
                <h3>User</h3>
                <nav>
                  <button onClick={()=>router.push('/user/list')}>列表</button>
                  <button onClick={()=>router.push('/user/add')}>新增</button>
                </nav>
                <div>
                    {this.props.children}
                </div>
            </>
        )
    }
}