import React, {Component} from 'react';

class Clients extends Component{

    render(){
        return(
            <div className="modal">
                <form className="cont_client">
                <label>Clinet Name:</label><input type="text" value={this.state.name} name="name"/><br/>
                <label>Building Type:</label> <input type="text" value={this.state.date} name="building type"/><br/>
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