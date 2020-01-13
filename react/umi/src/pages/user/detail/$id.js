import React from 'react';
export default class UserList extends React.Component {
    render() {
        let id = this.props.match.params.id

        return (
            <>
                <h3>User Deteil: ID{id}</h3>
            </>
        )
    }
}