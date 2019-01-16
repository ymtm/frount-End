import React, { Component } from 'react';
import './App.css';
import Companies from './components/Companies';
import ShowClient from './components/ShowClient';

class App extends Component {
  constructor(){
    super()
    this.state = {
      companies:[],
      isClient: false,
      activeComponent:'',
      thatCompany: [],
      listOfcomps : true,
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

    render() {
    return (
      <div className="App">
      <h1>Companies</h1>
      
       {this.state.listOfcomps ? this.renderCompanies(this.state.companies) : false}
       { this.state.thatCompany.length !== 0 ? this.renderCompanyByID(this.state.thatCompany) : ''}
      </div>
    );
  }
}

export default App;
