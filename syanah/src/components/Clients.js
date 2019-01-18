import React, {Component} from 'react';
// import swal from 'sweetalert';
class Clients extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            type: '',
            period: null,
            value:'',
            company_id: props.comp_id
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //handleChange to  handle the state of clients input
    // which we gonna use in onChange at each input
    handleChange(event){
        const currInput = event.target.name;

        // one of the input has to be send as integer
        const newValue = currInput === "period" ? Number(event.target.value) : event.target.value;
        
        this.setState({
            [currInput]: newValue
        })
    }

    //this can submit any changes we have made in the state
    handleSubmit(event){
        event.preventDefault();
        console.log('U R doin somethin!!!')
        this.props.createContracts(this.state)
    }
    
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                <label>Clinet Name:</label><input type="text" value={this.state.name} name="name" onChange={this.handleChange}/><br/>
                <label>Building Type:</label> <input type="text" value={this.state.type} name="type" onChange={this.handleChange}/><br/>
                <label>Contract Period:</label>
                    <select name="period" value={this.state.period} onChange={this.handleChange}>
                        <option selected value= "3" >3 months</option>
                        <option value= "6" >6 months</option>
                        <option value= "12" >12 months</option>
                    </select><br/>
                    <input type="text" value/>
                <button>submit</button>
        
                
                </form>
                {/* { <button>{swal("Good job!", "You clicked the button!", "success")}</button>} */}

            </div>
        )
    }

}


export default Clients;
