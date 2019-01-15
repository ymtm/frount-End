import React, { Component } from 'react';
import './App.css';
import Clients from './components/Clients';
import Companies from './components/Companies'; 

class App extends Component {
  constructor(){
    super();
    this.state = {
      
    }
  } 

  deleteTheContract(contract){
    const API_URL= '';
    const url = API_URL + `/companies/${comp_id}/client/${client_id}`;
    fetch(url, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => {
         this.state.contract.filter( el => el.id !== contract.id );
      })
        try {
          throw new Error('error in delete contract');
      }
      catch(e) {
          console.log(e);
      
      }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          
        </header>
      </div>
    );
  }
}

export default App;
