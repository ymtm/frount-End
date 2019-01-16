import React , { Component } from 'react';

class Show extends Component {

    constructor(){
        super();
        this.state =  {

        }
    }

    render(){

        return(
            <div>
                <h1>{this.props.thatCompany !== undefined ? this.props.thatCompany.comp_name : ''}</h1>
                <p>{this.props.thatCompany !== undefined ? this.props.thatCompany.comp_description : ''}</p>
            </div>
        )
    }
}

export default Show;