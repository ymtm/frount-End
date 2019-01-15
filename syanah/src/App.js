import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      client: false,
      company: false,
      
    }

  }
toggleClient(){
  this.setState({
    client: !this.state.client
  })

  console.log('clicked client' , this.state.client)
}

toggleCompany(){
  this.setState({
    company: !this.state.company
  })
  console.log('clicked company', this.state.company)
}

updateStatus(cont_id){
  const url = `http://localhost:3000/companies/contracts/${cont_id.id}`
    fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cont_id)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      
    })
    .catch(error => {
      console.log(error);
    })

}
  render() {
    return (
      <main className="container">
        <button className="btn btn-sm m-2 btn-danger" onClick = {this.toggleClient.bind(this)} > client</button>
        <button className="btn btn-sm m-2 btn-primary" onClick = {this.toggleCompany.bind(this)}> company</button>
      </main>
    );
  }
}

export default App;
