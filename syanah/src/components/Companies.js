
import React from 'react';
import Clients from './Clients';

const Companies = (props) => {

        return(
            <main>
                <div onClick={() => props.showCompany(props.comp.comp_id)}>
                    <img src={props.comp.comp_logo}alt=""/>
                    <h1>{props.comp.comp_name}</h1>    

                </div>

                <div>
                    <Clients/>
                </div>
            </main>
        )
}

export default Companies;