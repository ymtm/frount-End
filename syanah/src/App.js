import React, { Component } from 'react';
import './App.css';
import Companies from './components/Companies';
import ShowClient from './components/ShowClient';
import ShowCompany from './components/ShowCompany';

//for heruok purpose there is this api-url which will
//be fitched multiball times inside the app.js
const API_URL = 'http://localhost:3000'


class App extends Component {
  constructor() {
    super();
    this.state = {
      // activeComponent: '',
      // isSelected: false,
      companies: [],
      thatCompany: [],
      listOfcomps: true,
      userType: null,
      contracts: []

    }
  }

  componentDidMount() {
    console.log('fetching data');
    const url = API_URL + `/companies`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          companies: data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  getCompanyContracts(id) {
    this.setState({
      listOfcomps: false,
    })
    const url = API_URL + `/companies/show/${id}`
    console.log('fetching data');
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          contracts: data
        })
      })
      .catch(error => {
        console.log(error)
      })

  }

  getCompany(id) {
    this.setState({
      userType: null,
    })
    console.log('clicked', id);
    const companyByID = this.state.companies.filter((elem) => {
      return elem.comp_id === id;
    });

    this.setState({
      thatCompany: companyByID,
    })
  }


  //  RENDERS
  //
  //
  //
  //
  //

  renderCompanies(allCompanies) {
    if (this.state.thatCompany.length === 0 && this.state.listOfcomps === true) {
      return allCompanies.map((company) => {
        return (

          <Companies key={company.id}
            userType={this.state.userType}
            comp={company}
            getCompanyContracts={this.getCompanyContracts.bind(this)}
            getCompany={this.getCompany.bind(this)} />
        )
      })
    }
  }


  renderCompanyByID(comp) {
    console.log('* * * * * ', comp[0]);
    return <ShowClient thatCompany={comp[0]} />
  }


  renderContracs(contracts) {
    return contracts.map((contract) => {
      return (
        <ShowCompany contract={contract}
                     updateStatus={this.updateStatus.bind(this)}/>
      )
    })
  }


  //
  //
  //
  //

  //  START OF CRUD
  //
  //
  //



  //  deleteTheContract(comp_id,client_id){

  //   const url = API_URL + `/companies/${comp_id}/client/${client_id}`;
  //   fetch(url, { method: 'DELETE' })
  //     .then(response => response.json())
  //     .then(data => {
  //        this.state.contracts.filter( el => el.id !== contract.id );
  //     })
  //       try {
  //         throw new Error('error in delete contract');
  //     }
  //     catch(e) {
  //         console.log(e);

  //     }
  // } 
  
  updateStatus(contract) {
    console.log(contract);
    const state = {
      status: 'Active',
      cont_id: contract.contract_id
    }
    const url = API_URL + `/companies/contracts/${contract.contract_id}`;
    fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(state)
    })
      .then(response =>  response.json())

      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.log(error);
      })
  }

  //END OF CRUD 
  //
  //
  //
  //


  //switch between clients and companies as users
  setUserTypeToClient() {
    this.setState({
      userType: 'client'
    })
  }

  setContractStatus(contract) {
    // fetch update 
    this.state.contracts.indexOf(contract)
    // set state 

  }
  setUserTypeToCompany() {
    this.setState({
      userType: 'company'
    })
  }

  render() {
    return (
      <div className="container">
        <button className="btn m-2 btn-outline-dark" onClick={() => { this.setUserTypeToClient() }}> client</button>
        <button className="btn m-2 btn-outline-dark" onClick={() => { this.setUserTypeToCompany() }}>company</button>

        {this.state.userType ? this.renderCompanies(this.state.companies) : ''}
        {this.state.thatCompany.length !== 0 ? this.renderCompanyByID(this.state.thatCompany) : ''}
        {this.state.userType === 'company' ? this.renderContracs(this.state.contracts) : ''}
      </div>


    );
  }
}

export default App;