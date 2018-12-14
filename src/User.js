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
                <h4>Список логинов:</h4>
                <h4>{listLogin}</h4>
            </div>
        )
    }
}
