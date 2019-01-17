import React from 'react'

const ShowCompany =  (props) => {

    return(
        <div>
            <div className="card">
                <ul className="card-body">
                    <li className="card-subtitle mb-2 text-muted">Client name: {props.contract.client_name}</li>
                    <li className="card-subtitle mb-2 text-muted">Type of building: {props.contract.client_type}</li>
                    <li className="card-subtitle mb-2 text-muted">Contract issue date: {props.contract.contract_issue_date}</li>
                    <li className="card-subtitle mb-2 text-muted">Contract period: {props.contract.contract_period}</li>
                    <li className="card-subtitle mb-2 text-muted">Contract status: {props.contract.contract_status}</li>
                </ul>
            
            </div>
            
        
            <div className="text-center">
                <button type="button" className="btn m-2 btn-outline-dark" onClick={() =>  props.updateStatus(props.contract)}>Edit</button>
                <button type="button" className="btn m-2 btn-outline-dark">Delete</button>
            </div>
        </div>
    )
}

export default ShowCompany