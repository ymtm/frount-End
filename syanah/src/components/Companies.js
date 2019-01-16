
import React from 'react';
import Clients from './Clients';

const Companies = (props) => {

        return(
            <div>
                <div onClick={() => props.showCompany(props.comp.comp_id)}>
                    <img src={props.comp.comp_logo}alt=""/>
                    <h1>{props.comp.comp_name}</h1>    

                </div>

              
                    <Clients createContracts={props.createContracts}/>
             
            </div>
        )
}

export default Companies;