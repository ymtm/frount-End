import React, { Component } from 'react';
import './App.css';
import Companies from './components/Companies';
import ShowClient from './components/ShowClient';
import logo from './images/syanaPic.png'
import ShowCompany from './components/showCompany';
import { getUser, logout } from "./services/authService";
import NavBar from "./components/NavBar";
import AuthForm from "./components/AuthForm";
import Profile from "./components/Profile";

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
      contracts: [],
      user: null,
      form: "signup"
    }
  }
// --------------------------------------------------------
/// the auth methods 
checkForUser() {
  const user = getUser();
  if (user) {
    this.setState({ user });
  }
}
// componentDidMount() {
//   this.checkForUser();
// }

changeForm = type => {
  console.log(type);
  this.setState({
    form: type
  });
};

login = () => {
  const user = getUser();
  this.setState({ user });
};

logout = () => {
  logout();
  this.setState({ user: null });
};
// --------------------------------------------------------

  componentDidMount() {
    this.checkForUser();
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

    // this.setState({
    //   userType: null,
    // })
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
    console.log("renderContracs" , contracts , this.state.contracts)
    return contracts.map((contract) => {
      return (
        <ShowCompany contract={contract}
          updateStatus={this.updateStatus.bind(this)} 
          deleteContract={this.deleteTheContract.bind(this)}/>
      )
    })
  }
  // renderContracs(contracts){
  //   this.setState({
  //     userType:'client'
  //   })
  //   return contracts.map((contract) =>{
  //     return (
  //       <ShowCompany contract={contract}/>
  //     )
      
  //   }) 

  // }

  //  START OF CRUD
  //
  //
  //


   deleteTheContract(comp_id,client_id){
    const url = API_URL + `/companies/${comp_id}/client/${client_id}`;
      console.log("IN *** ");
    fetch(url, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => {
         const updatedContracts = this.state.contracts.filter(
           contract => contract.comp_id === comp_id && contract.client_id !== client_id
           )
           this.setState({
            contracts : updatedContracts,
             userType : "company"
           })
      })
      .catch((error) => console.log(error))
  } 
  

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
        console.log(data);
        this.getCompanyContracts(contract.comp_id);
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
  setUserTypeToCompany() {
    this.setState({
      userType: 'company'
    }) 
  }

  setContractStatus(contract) {
    // fetch update 
    this.state.contracts.indexOf(contract)
    // set state 

  }
  setHomePage(){
    this.setState({
      userType: null,
      thatCompany: [],
      listOfcomps: true
    })
   }

   setHomeButton(){
    if (this.state.userType !== null){
      return <button onClick={() =>{ this.setHomePage()} }>Home  </button>
    } else {
      return
      // <button onClick={() =>{ this.setHomePage()} }>Home  </button>
    }
   }
   

  render() {
    return (
  <div>

      <div className="container">
        <button className="btn m-2 btn-outline-dark" onClick={() => { this.setUserTypeToClient() }}> Client</button>
        <button className="btn m-2 btn-outline-dark" onClick={() => { this.setUserTypeToCompany() }}>Companies</button>
        {this.setHomeButton()}
        <img src="./images/syanaPic" alt=""/>
        {this.state.userType ? this.renderCompanies(this.state.companies) : ''}
        {this.state.thatCompany.length !== 0 ? this.renderCompanyByID(this.state.thatCompany) : ''}
        {this.state.userType === 'company' ? this.renderContracs(this.state.contracts) : ''}
      </div>

      <div> 
      <NavBar
        user={this.state.user}
        changeForm={this.changeForm}
        logout={this.logout}
        getProducts={this.getProducts}
        />

      <div className="container">
        {this.state.user ? (
          <Profile user={this.state.user} />
          ) : (
            <AuthForm form={this.state.form} onLogin={this.login} />
            )}
      </div>
            </div>
            </div>
    );
    
  } 
}

export default App;