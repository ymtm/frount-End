import React from 'react'

const ShowCompany =  (props) => {

    return(
        <div> 
            {props.contract.client_name}
            {props.contract.client_type}
            {props.contract.contract_period}
            {props.contract.contract_status}
            {props.contract.contract_issue_date}
        </div>
        
    )
}

export default ShowCompany
