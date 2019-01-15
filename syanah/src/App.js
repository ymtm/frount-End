import React, { Component } from 'react';
import './App.css';
import Companies from './components/Companies';
import Clients from './components/Clients';

class App extends Component {
  constructor(){
    super();
    this.state ={
      compoanie:[],
      clients: [],

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

creatNewCompanies(client){
  const url = 'http://localhost:3000/clients'
  fetch(url, {
    method: 'POST',
    headers: {
      "content-type": "application/json"

    },
body: JSON.stringify(client)
  
  })
  .then(response => response.json())
  .then(data =>{
    console.log('DATA')
    console.log('datat');
    const updatedClinet = this.state.client([data])
    this.setState({
      client: updatedClinet,
      
      

    })

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
