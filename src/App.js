import React, { Component } from 'react';
import './App.css';
import Users from './User';

const API = 'https://api.github.com/search/users?q=';

class App extends Component {
  state ={
      items: [
        
      ]
  }

  getUser = () => {
    const nick= this.refs.nick.value;
    fetch (API+nick)
    .then(response => response.json())
    .then (data =>{
      this.setState({
          items: data.items
      })
      
    })
  }
  Greeting () {
    const {listLogin} = this.props
    if (this.state.items.length===30) {
      return <Users listLogin={listLogin} items={this.state.items}/>;
    }else{
      return;
    }
    
  }
  render() {  
    return (
      <div className="App">
        <input type="text" placeholder='Введите ник' ref="nick" /> 
        <button onClick={this.getUser} >Узнать логины</button>
        <pre>{this.Greeting ()}</pre>
      </div>
    );
  }
}

export default App;
