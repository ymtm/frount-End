import React, {Component} from 'react';

class Clients extends Component{
    constructor(){
        super()
        this.state = {
            name: '',
            type: '',
            period: null
        }
}
    render(){
        return(
            <div className="modal">
                <form className="cont_client">
                <label>Clinet Name:</label><input type="text" value={this.state.name} name="name"/><br/>
                <label>Building Type:</label> <input type="text" value={this.state.date} name="type"/><br/>
                <label>Contract Period:</label><input type="text" value={this.state.name} name="period"/><br/>
                <button>submit</button>     
                </form>
            
            </div>
        )
    }

}


export default Clients;