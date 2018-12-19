import React, { Component } from 'react';
import './App.css';
import Users from './User';

const API = 'https://api.github.com/search/users?q=';

class App extends Component {
  render() {  
    return (
      <div className="App">
        <input type="text" placeholder='Введите ник' value={this.state.value} onChange={this.handleChange} maxLength="12"/> 
        {this.state.value !== '' &&
        <button onClick={this.getUser} >Поиск</button>
        }
        <pre onChange={this.greeting}>{this.greeting ()}</pre>
      </div>
    );
  }

  state ={
      value: '',
      items: [
      ]
  }

  getUser = () => {
    const nick= this.state.value;
    fetch (API+nick)
    .then(response => response.json())
    .then (data =>{
      this.setState({
          items: data.items
      })
    })
    .catch(err => alert('Ошибка:' + err))
  }
  greeting = () => {
    const {listLogin} = this.props
    if (this.state.items.length > 0) {
      return <Users listLogin={listLogin} items={this.state.items}/>;
    }
    else{
      return 'Введите ник и нажмите "Поиск"';
    }
  }
  handleChange =(event) => {
    this.setState({value: event.target.value});
  }
}

export default App;
