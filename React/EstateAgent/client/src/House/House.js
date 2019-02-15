import React from 'react'

import './House.css'

const house=function(props){
    return(
        <div className="House">
            <img src={props.imageUrl} alt="alt"></img>
        </div>
    )
}

export default house