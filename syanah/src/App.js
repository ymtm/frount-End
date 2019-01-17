import React, { Component } from 'react';
import './App.css';
import Companies from './components/Companies';
import ShowClient from './components/ShowClient';
import ShowCompany from './components/ShowCompany';

class App extends Component {
  constructor() {
    super();
    this.state = {
      companies: [],
      activeComponent: '',
      thatCompany: [],
      listOfcomps: true,
      isSelected: false,
      userType: null,
      contracts:[],

    }
  }

  componentDidMount() {
    console.log('fetching data');
    fetch('http://localhost:3000/companies')
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
    console.log('fetching data');
    fetch(`http://localhost:3000/companies/show/${id}`)
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

  renderContracs(contracts){
    return contracts.map((contract) =>{
      return (
        <ShowCompany 
        contract={contract}/>
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

  createContracts(client) {
    const url = 'http://localhost:3000/clients'
    fetch(url, {
      method: 'POST',
      headers: {
        "content-type": "application/json"

      },
      body: JSON.stringify(client)
    })
      .then(response => response.json())
      .then(data => {
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

  //  deleteTheContract(contract){
  //   const API_URL= '';
  //   const url = API_URL + `/companies/${comp_id}/client/${client_id}`;
  //   fetch(url, { method: 'DELETE' })
  //     .then(response => response.json())
  //     .then(data => {
  //        this.state.contract.filter( el => el.id !== contract.id );
  //     })
  //       try {
  //         throw new Error('error in delete contract');
  //     }
  //     catch(e) {
  //         console.log(e);

  //     }
  // } 

  updateStatus(cont_id) {
    const url = `http://localhost:3000/companies/contracts/${cont_id}`
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

  //END OF CRUD 
  //
  //
  //
  //

  setUserTypeToClient() {
    this.setState({
      userType: 'client'
    })

  }
  setUserTypeToCompany() {
    this.setState({
      userType: 'company'
    })
  }


  // checkingSelection() {
  //   // this will check wheather the selection on the landing page is a client or a company,
  //   //and it going to render different stuff based on that selection

  // }

  render() {
    return (
      <main className="container">
        <button className="btn btn-sm m-2 btn-danger" onClick={() => { this.setUserTypeToClient() }}> client</button>
        <button className="btn btn-sm m-2 btn-primary" onClick={() => { this.setUserTypeToCompany() }}>company</button>

        {this.state.userType ? this.renderCompanies(this.state.companies) : ''}
        {this.state.thatCompany.length !== 0 ? this.renderCompanyByID(this.state.thatCompany) : ''}
        {this.state.userType === 'company' ? this.renderContracs(this.state.contracts) : ''}
      </main>


    );
  }
}

export default App;
