import React, { Component } from 'react';
import './App.css';
import Companies from './components/Companies';
import Clients from './components/Clients';
import Show from './components/Show';

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
  fetch('http://localhost:3000/companies')
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
    const updatedClinet = this.state.clients.concat([data])
    this.setState({
      clients: updatedClinet,
  
    })
    .catch((error) => {
      console.log(error);
    })
  })
}
 

renderCompanies(allCompanies){
 return allCompanies.map((company)=>{
   return(
     <Companies key={company.id} comp={company} showCompany={this.showCompany.bind(this)}/>
   )
 })
}
showCompany(id) {
 console.log('clicked', id);

   
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

  render() {
    return (
      <main className="container">
        <button className="btn btn-sm m-2 btn-danger" onClick = {this.toggleClient.bind(this)} > client</button>
        <button className="btn btn-sm m-2 btn-primary" onClick = {this.toggleCompany.bind(this)}> company</button>
        <h1>HEY</h1>
       {this.renderCompanies(this.state.companies)}
      </main>


    );
  }
}

export default App;
