import React, { Component } from 'react';
import './App.css';
import Companies from './components/Companies';
import ShowClient from './components/ShowClient';
import logo from './images/syanaPic.png'

class App extends Component {
  constructor(){
    super();
    this.state = {
      companies:[],
      isClient: false,
      isCompany:false,
      activeComponent:'',
      thatCompany: [],
      listOfcomps : false,
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

 deleteTheContract(comp_id , client_id){
  const API_URL= 'http://localhost:3000/';
  const url = API_URL + `/companies/${comp_id}/client/${client_id}`;
  fetch(url, { method: 'DELETE' })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      //  this.status.filter( el => el.id !== contract.id );
    })
    .catch(error => console.log(error))
    //   try {
    //     throw new Error('error in delete contract');
    // }
    // catch(e) {
    //     console.log(e);
    
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
  this.setState({listOfcomps:true , isCompany: false })
  console.log('clicked client' , this.state.client)
}
toggleCompany(){
  this.setState({listOfcomps:true , isClient:false})
}



  render() {
    return (
      <main className="container">
        <button className="btn btn-sm m-2 btn-danger" onClick = {this.toggleIsClient.bind(this)} > client</button>
        <button className="btn btn-sm m-2 btn-primary" onClick = {this.toggleCompany.bind(this)}> company</button>
        {/* <h1 className="Hey">HEY Companies</h1> */}

        <div className="image">
        <img src={logo} style={{width:'400px' , height:'200px' , alignContent: 'center'}} alt="HEYA"/>
        </div>
       {this.state.listOfcomps ? this.renderCompanies(this.state.companies) : ''}
       {this.state.thatCompany.length !== 0 ? this.renderCompanyByID(this.state.thatCompany) : ''}
      </main>


    );
  }
}

export default App;
