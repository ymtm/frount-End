import React, { Component } from 'react';
import './App.css';
import companies from './components/Companies';
import clients from './components/Clients';

class App extends Component {
  constructor(){
    super();
    this.state ={
      compoanie:[],


    }
  }

  componentDidMount(){
    console.log('fetching data');
    fetch('http://localhost:3000/Companies')
    .then( response => response.json())
    .then( data => {
      console.log(data);
      this.setState({
        companies: data
      })
    })
    .catch (error => {
      console.log(error)
    })
  }
  render() {
    return (
      <div className="App">
  
      </div>
    );
  }
}

export default App;
