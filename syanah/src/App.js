import React, { Component } from 'react';
import './App.css';
import Companies from './components/Companies';
import ShowClient from './components/ShowClient';


class App extends Component {
  constructor(){
    super();
    this.state = {
      companies:[],
      isClient: false,
      activeComponent:'',
      thatCompany: [],
      listOfcomps : true,
      client: []
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

renderCompanies(allCompanies){
   return allCompanies.map((company)=>{
     return(
       <Companies key={company.id} comp={company} showCompany={this.showCompany.bind(this)}/>
     )
   })
  }
  
  showCompany(id) {
    this.setState({
      listOfcomps : false,
    })
   console.log('clicked', id);
    const companyByID = this.state.companies.filter((elem) =>{
      return elem.comp_id === id;
    });

      this.setState({
        thatCompany : companyByID,
      })
      
    }

    renderCompanyByID(comp){
      console.log('*&*',comp[0]);
      return <ShowClient thatCompany={comp[0]}/>
    }

createContracts(client){
  const url = 'http://localhost:3000/client'
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
    console.log('data');
    const updatedClinet = this.state.client.concat([data])
    this.setState({
      client: updatedClinet,
  
    })
    console.log(this.state.client)
  })
    .catch((error) => {
      console.log(error);
    })
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
toggleIsClient(){
  this.setState({
    isClient: !this.state.isClient
  })

  console.log('clicked client' , this.state.client)
}





  render() {
    return (
      <main className="container">
        <button className="btn btn-sm m-2 btn-danger" onClick = {this.toggleIsClient.bind(this)} > client</button>
        <button className="btn btn-sm m-2 btn-primary" onClick = {this.toggleIsClient.bind(this)}> company</button>
        <h1>HEY</h1>
       <h1>Companies</h1>
       {this.state.listOfcomps ? this.renderCompanies(this.state.companies) : false}
       { this.state.thatCompany.length !== 0 ? this.renderCompanyByID(this.state.thatCompany) : ''}
      </main>


    );
  }
}

export default App;
