import React, { Component } from 'react';
import './App.css';
import Companies from './components/Companies';
import Show from './components/Show';

class App extends Component {
  constructor(){
    super()
    this.state = {
      companies:[],
      client: false,
      company: false,
      activeComponent:'',
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
      .catch( error => {
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
   console.log('clicked', id);

     
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
      <h1>HEY</h1>
       {this.renderCompanies(this.state.companies)}
      </div>
    );
  }
}

export default App;
