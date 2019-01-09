import React, { Component } from 'react';
import './App.css';
import { PulseLoader } from 'react-spinners';
import { Container, Row, Col, Button, Input } from 'reactstrap';
import Users from './User';
import Pagination from "react-js-pagination";

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      loadingBar: false,
      items: null,
      error: null,
      totalCount: null,
      activePage: 1,
    };
  }

  getUser = () => {
    this.setState({
      loadingBar: true,
      error: null,
    })
    const nick = this.state.value;
    fetch (`https://api.github.com/search/users?q=${nick}&page=1`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Opss!');
      }
    })
    .then (data =>{
      this.setState({
          items: data.items,
          loadingBar: false,
          totalCount: data.total_count,
      })
    })
    .catch(() => this.setState({ error: true, loadingBar: false}))
  } 

  greeting = () => {
    if (this.state.totalCount === null  && this.state.error !== true) {
      return `Введите ник пользователя и нажмите "Поиск"`
    }
    else if (this.state.error === true) {
      return  `Ограничение использования API. Повторите попытку через 30 секунд.`
    }
    else if (this.state.totalCount  !== 0 && this.state.items !== undefined) {
      return <Users  items={this.state.items}   />;
    }
    else if (this.state.totalCount  === 0) {     
      return `По вашему запросу ничего не найдено. Измените запрос.`
    }
  }

  handleChange =(event) => {
    this.setState({value: event.target.value});
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }
  render() {  
    return (
      <Container className="App">
        <Row className="input-and-button" >
          <Col xs="12" sm="10">
            <Input className="nick-input" type="text" placeholder='Введите ник' value={this.state.value} onChange={this.handleChange} maxLength="12"/> 
          </Col>
          <Col xs="4" sm="2" className="button-find">
            <Button className="shadow none" disabled={!this.state.value || this.state.loadingBar  } color="success" onClick={this.getUser} block>Поиск</Button>
          </Col>
          <Col xs="12" className='pagination justify-content-center' >
          {this.state.totalCount > 30 &&
        <Pagination 
          hideDisabled
          activePage={this.state.activePage}
          itemsCountPerPage={30}
          totalItemsCount={this.state.totalCount}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        /> 
          }
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
