
import React from 'react';


const Companies = (props) => {
    return(
        <div className="container">
            
            <div className="row align-items-center" onClick={() => props.userType === 'client' ? props.getCompany(props.comp.comp_id) : props.getCompanyContracts(props.comp.comp_id)}>
                <img src={props.comp.comp_logo} alt="" className="col-6"/>
                <h1 className="col-6">{props.comp.comp_name}</h1>    
            </div>
                
            
        </div>
    )
}

export default Companies;