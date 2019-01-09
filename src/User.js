import React, { Component } from 'react'

export default class Users extends Component {
    render() {
        const {items} = this.props;
        return (
            <div>
                <h6>Список логинов:</h6>
                <span>{items.map((link) =>
                    <p type="1" key={link.login} >{link.login}</p>)}
                </span>
            </div>
        )
    }
}
