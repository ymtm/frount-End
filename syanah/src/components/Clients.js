import React, {Component} from 'react';

class Clients extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
            type: '',
            period: null,

        }
    }
    
    render(){
        return(
            <div className="modal">
                <form className="cont_client">
                <label>Clinet Name:</label><input type="text" value={this.state.name} name="name"/><br/>
                <label>Building Type:</label> <input type="text" value={this.state.type} name="type"/><br/>
                <label>Contract Period:</label>
                    <select name="period" value={this.state.period}>
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