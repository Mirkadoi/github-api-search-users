import React, { Component } from 'react';
import './App.css';
import { PulseLoader } from 'react-spinners';
import { Container, Row, Col, Button, Input } from 'reactstrap';
import Users from './User';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      loadingBar: false,
      items: null,
    };
  }

  getUser = () => {
    this.setState({
      loadingBar: true
    })
    const nick= this.state.value;
    fetch (`https://api.github.com/search/users?q=${nick}`)
    .then(response => response.json())
    .then (data =>{
      this.setState({
          items: data.items,
          loadingBar: false
      })
    })
    .catch(err => alert(`Етить что то пошло не так. Попробуйте позже. Минут через 5.`))
  }

  greeting = () => {
    if (this.state.items === null || this.state.items === undefined) {
        return `Введите ник пользователя и нажмите "Поиск"`
    }
    else if (this.state.items.length > 0) {
      return <Users listLogin={this.listLogin} items={this.state.items}/>;
    }
    else if (this.state.items.length === 0) {     
        return `По вашему запросу ничего не найдено. Измените запрос.`
    }
  }
  loadingBarFunc = () => {

  }

  handleChange =(event) => {
    this.setState({value: event.target.value});
  }

  render() {  
    return (
      <Container className="App">
        <Row className="input-and-button" >
          <Col xs="12" sm="10">
            <Input className="nick-input" type="text" placeholder='Введите ник' value={this.state.value} onChange={this.handleChange} maxLength="12"/> 
          </Col>
          <Col xs="4" sm="2" className="button-find">
            <Button className="shadow none" disabled={!this.state.value || this.state.loadingBar} color="success" onClick={this.getUser} block>Поиск</Button>
          </Col>
        </Row>
        <Row >
          <Col xs="12">
          <PulseLoader
            size={35}
            marjin={10}
            color={'#1FF7CA'}
            loading={this.state.loadingBar}
          />
          </Col>
          <Col xs="12">
          {!this.state.loadingBar &&
          <div>{this.greeting ()}</div>
          }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
