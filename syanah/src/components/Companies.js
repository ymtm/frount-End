
import React from 'react';

const Companies = (props) => {

        return(
            <div onClick={() => props.userType === 'client' ? props.getCompany(props.comp.comp_id) : props.getCompanyContracts(props.comp.comp_id)}>
                <img src={props.comp.comp_logo}alt=""/>
                <h1>{props.comp.comp_name}</h1>    
            </div>
        )
}

export default Companies;