import React from 'react';
import router from 'umi/router';
export default class UserList extends React.Component {
    render() {
        return (
            <>
                <h3>User List</h3>
                <ul>
                    <li onClick={()=>router.push('/user/detail/1')}>用户1</li>
                    <li onClick={()=>router.push('/user/detail/2')}>用户2</li>
                </ul>
            </>
        )
    }
}