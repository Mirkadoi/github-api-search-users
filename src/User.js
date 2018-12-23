import React, { Component } from 'react'

export default class Users extends Component {
    render() {
        let {listLogin} = this.props
        const {items} = this.props
        listLogin = items.map((link) =>
        <li type="1" key={link.login} >{link.login}</li> 
        );
        return (
            <div>
                <h6>Список логинов:</h6>
                <p>{listLogin}</p>
            </div>
        )
    }
}
