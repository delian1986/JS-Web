import React, { Component } from 'react';
import AddPokemonForm from './AddPokemonForm';
import Pokemon from './Pokemon';

class LoggedInScreen extends Component {
    constructor() {
        super()

        this.state = {
            pokedex: []
        }
        this.updateRoster=this.updateRoster.bind(this)
    }

    updateRoster(newRoster){
        this.setState({pokedex:newRoster.pokemonColection})
    }

    componentDidMount(){
        fetch('http://localhost:5000/pokedex/pokedex')
        .then(data=>data.json())
        .then(response=>this.setState({pokedex:response.pokemonColection}))
        .catch((e)=>console.log(e))
    }

    render() {
        return (
            <div>
                <AddPokemonForm updateRoster={this.updateRoster}/>
                {this.state.pokedex.map((pokemon,index) =><Pokemon key={index} item={pokemon} />)}
            </div>
        )
    }
}

export default LoggedInScreen