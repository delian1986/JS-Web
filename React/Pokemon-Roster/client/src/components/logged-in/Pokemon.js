import React from 'react';

const Pokemon=(props)=>(
    <div>
        <h1>{props.item.pokemonName}</h1>
        <p>{props.item.pokemonInfo}</p>

    </div>

)

export default Pokemon