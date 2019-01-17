import React, {Component} from 'react';

class Clients extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            type: '',
            period: null,
            value:''

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const currInput = event.target.name;
        const newValue = currInput === "period" ? Number(event.target.value) : event.target.value;
        
        this.setState({
            [currInput]: newValue
        })
    }

    handleSubmit(event){
        event.preventDefault();
        console.log('U R doin somethin!!!')
        this.props.createContracts(this.state)
    }
    
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                <label>Clinet Name:</label><input type="text" value={this.state.name} name="name" onChange={this.handleChange}/><br/>
                <label>Building Type:</label> <input type="text" value={this.state.type} name="type" onChange={this.handleChange}/><br/>
                <label>Contract Period:</label>
                    <select name="period" value={this.state.period} onChange={this.handleChange}>
                        <option selected value= "3" >3 months</option>
                        <option value= "6" >6 months</option>
                        <option value= "12" >12 months</option>
                    </select><br/>
                <button>submit</button>
        
                
                </form>
            
            </div>
        )
    }

}


export default Clients;
