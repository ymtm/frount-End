import React , { Component } from 'react';
import Clients from './Clients';

const API_URL = 'http://localhost:3000'

class ShowClient extends Component {
  constructor(props){
    super(props);
    this.state =  {
      client: [],
    }
  }
  
  //send formInputs to the database
  // which will be called back from database on comapniesShow  
  
  createContracts(client){
    console.log('$$$$$$',client)
    const url = API_URL + `/client`
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
        console.log(data);
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

    render(){
        return(
            <div className="container">
                <h1>{this.props.thatCompany !== undefined ? this.props.thatCompany.comp_name : ''}</h1>
                <p>{this.props.thatCompany !== undefined ? this.props.thatCompany.comp_description : ''}</p>
                <Clients createContracts={this.createContracts.bind(this)} comp_id={this.props.thatCompany.comp_id}/>
            </div>
        )
    }
}

export default ShowClient;