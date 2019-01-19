import React, { Component } from "react";
import "./App.css";
import Companies from "./components/Companies";
import ShowClient from "./components/ShowClient";
// import logo from './images/syanaPic.png'
import ShowCompany from "./components/showCompany";
import { getUser, logout } from "./services/authService";
import NavBar from "./components/NavBar";
import AuthForm from "./components/AuthForm";
import Profile from "./components/Profile";

//for heruok purpose there is this api-url which will
//be fitched multiball times inside the app.js
const API_URL = "http://localhost:3000";

let map;
let markers = [];

// Scripting the map
/* https://github.com/manishbisht/Neighborhood-Map-React/blob/8e1b8bad0210d184c73ef40e6cf146a8f1d2d86a/src/components/App.js#L241
    Load script to the page*/
/**
 * Load the google maps Asynchronously
 * @param {url} url of the google maps script
 */
function loadMap(src, onloadFunction) {
  var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  script.onerror = loadError;
  if (onloadFunction) {
    script.onload = onloadFunction;
  }
  ref.parentNode.insertBefore(script, ref);
}
function loadError(oError) {
  alert("Failed to load google map API " + oError.target.src);
}

// ************ //

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
      form: "signup",
      map: {},
      locations: [
        {
          title: "Gallerian",
          location: { lat: 24.664221, lng: 46.681899 }
        }
      ]
    };
    this.initMap = this.initMap.bind(this);
  }
  // --------------------------------------------------------
  /// the auth methods
  checkForUser() {
    const user = getUser();
    if (user) {
      this.setState({ user, userType: user.usertype });
    }
  }

  chechWhoUser = userType => {
    this.setState({ userType });
    console.log("chechWhoUser", userType);
  };

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
    window.initMap = this.initMap;
    loadMap(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCQv4i45Nms1mxMcqGFnfA9RTow2XHWTho&v=3&callback=initMap",
      function() {}
    );

    this.checkForUser();

    console.log("fetching data");
    const url = API_URL + `/companies`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          companies: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getCompanyContracts(id) {
    this.setState({
      listOfcomps: false
    });
    const url = API_URL + `/companies/show/${id}`;
    console.log("fetching data");
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          contracts: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getCompany(id) {
    // this.setState({
    //   userType: null,
    // })
    console.log("clicked", id);
    const companyByID = this.state.companies.filter(elem => {
      return elem.comp_id === id;
    });

    this.setState({
      thatCompany: companyByID
    });
  }

  //  RENDERS
  //
  //
  //
  //
  //

  renderCompanies(allCompanies) {
    if (
      this.state.thatCompany.length === 0 &&
      this.state.listOfcomps === true
    ) {
      return allCompanies.map(company => {
        return (
          <Companies
            key={company.id}
            userType={this.state.userType}
            comp={company}
            getCompanyContracts={this.getCompanyContracts.bind(this)}
            getCompany={this.getCompany.bind(this)}
          />
        );
      });
    }
  }

  renderCompanyByID(comp) {
    console.log("* * * * * ", comp[0]);
    return <ShowClient thatCompany={comp[0]} />;
  }

  renderContracs(contracts) {
    console.log("renderContracs", contracts, this.state.contracts);
    return contracts.map(contract => {
      return (
        <ShowCompany
          contract={contract}
          updateStatus={this.updateStatus.bind(this)}
          deleteContract={this.deleteTheContract.bind(this)}
        />
      );
    });
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

  deleteTheContract(comp_id, client_id) {
    const url = API_URL + `/companies/${comp_id}/client/${client_id}`;
    console.log("IN *** ");
    fetch(url, { method: "DELETE" })
      .then(response => response.json())
      .then(data => {
        const updatedContracts = this.state.contracts.filter(
          contract =>
            contract.comp_id === comp_id && contract.client_id !== client_id
        );
        this.setState({
          contracts: updatedContracts,
          userType: "company"
        });
      })
      .catch(error => console.log(error));
  }

  updateStatus(contract) {
    console.log(contract);
    const state = {
      status: "Active",
      cont_id: contract.contract_id
    };
    const url = API_URL + `/companies/contracts/${contract.contract_id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(state)
    })
      .then(response => response.json())

      .then(data => {
        console.log(data);
        this.getCompanyContracts(contract.comp_id);
      })
      .catch(error => {
        console.log(error);
      });
  }

  //END OF CRUD
  //
  //
  //
  //

  //switch between clients and companies as users
  setUserTypeToClient() {
    this.setState({
      userType: "client"
    });
  }
  setUserTypeToCompany() {
    this.setState({
      userType: "company"
    });
  }

  setContractStatus(contract) {
    // fetch update
    this.state.contracts.indexOf(contract);
    // set state
  }
  setHomePage() {
    this.setState({
      userType: null,
      thatCompany: [],
      listOfcomps: true
    });
  }

  setHomeButton() {
    return this.state.userType !== null ? (
      <button
        className="btn m-2 btn-outline-dark"
        onClick={() => {
          this.setHomePage();
        }}
      >
        Home
      </button>
    ) : (
      ""
    );
  }
  showButtons(){
    const clientBut = <button className="btn m-2 btn-outline-dark btn-lg btn-block" onClick={() => { this.setUserTypeToClient() }}>Client</button>;
    const compBut = <button className="btn m-2 btn-outline-dark btn-lg btn-block" onClick={() => { this.setUserTypeToCompany() }}>Company</button>;
    return this.state.userType === null ? [clientBut, compBut] : '';
      
  }

  //  MAP's API
  //
  //
  //

  componentDidUpdate() {
    // window.initMap = this.initMap;
    // loadMap(
    //   "https://maps.googleapis.com/maps/api/js?key=AIzaSyCQv4i45Nms1mxMcqGFnfA9RTow2XHWTho&v=3&callback=initMap",
    //   function() {}
    // );

    if (this.state.map.gm_bindings_) {
      let bounds = new window.google.maps.LatLngBounds();
      this.state.locations.map((pins, index) => {
        let pin = new window.google.maps.Marker({
          map: this.state.map,
          position: pins.location,
          title: pins.title
        });
        markers.push(pin);
        markers.forEach(elem => bounds.extend(elem.position));
        return true;
      });
    }
  }

  // componentDidMount() {
  //   // Load google map API and set initial location
  //   window.initMap = this.initMap;
  //   loadMap(
  //     "https://maps.googleapis.com/maps/api/js?key=AIzaSyCQv4i45Nms1mxMcqGFnfA9RTow2XHWTho&v=3&callback=initMap",
  //     function() {}
  //   );
  // }

  initMap() {
    var getMap = document.getElementById("map");

    // getMap.style.height = window.innerHeight + "px";
    map = new window.google.maps.Map(getMap, {
      center: { lat: 24.6642205, lng: 46.6765543 },
      zoom: 15
    });

    this.setState({ map: map });
  }

  render() {
    return (
      <div>
        <div className="container">
          <button
            className="btn m-2 btn-outline-dark"
            onClick={() => {
              this.setUserTypeToClient();
            }}
          >
            {" "}
            Client
          </button>
          <button
            className="btn m-2 btn-outline-dark"
            onClick={() => {
              this.setUserTypeToCompany();
            }}
          >
            Companies
          </button>
          {this.setHomeButton()}
          {/* {this.showButtons()} */}
          {/* <img src="./images/syanaPic" alt="" /> */}
          {this.state.userType
            ? this.renderCompanies(this.state.companies) : ""}
          {this.state.thatCompany.length !== 0 ? this.renderCompanyByID(this.state.thatCompany): ""}
          {this.state.userType === "company" ? this.renderContracs(this.state.contracts) : ""}
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
              <AuthForm
                form={this.state.form}
                chechWhoUser={this.chechWhoUser}
                onLogin={this.login}
              />
            )}
          </div>
        </div>
        <div id="map" style={{ height: "400px" }} />
      </div>
    );
  }
}

export default App;
