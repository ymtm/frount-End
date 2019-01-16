import React, {Component} from 'react';

class Clients extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
            type: '',
            period: null

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = 
    }

    handleChange(event){
        this.setState({
            value: event.target.name
        })
    }

    handleSubmit(event){
        event.preventDefault();
        console.log('U R doin somethin!!!')
    }
    
    render(){
        return(
            <div className="modal">
                <form className="cont_client" onSubmit={this.handleSubmit}>
                <label>Clinet Name:</label><input type="text" value={this.state.name} name="name" onChange={this.handleChange}/><br/>
                <label>Building Type:</label> <input type="text" value={this.state.type} name="type" onChange={this.handleChange}/><br/>
                <label>Contract Period:</label>
                    <select name="period" value={this.state.period} onChange={this.handleChange}>
                        <option value="three months">3 months</option>
                        <option value="six months">6 months</option>
                        <option value="one year">1 year</option>
                    </select><br/>
                <button>submit</button>
        
                
                </form>
            
            </div>
        )
    }

}


export default Clients;