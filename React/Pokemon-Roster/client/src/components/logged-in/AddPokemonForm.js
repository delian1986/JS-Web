import React, { Component } from 'react';

class AddPokemonForm extends Component {
    constructor() {
        super()

        this.state = {
            form: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const name = e.target.dataset.name
        const value = e.target.value

        const newObj = {}
        newObj[name] = value

        this.setState({
            form: Object.assign(this.state.form, newObj)
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        fetch(
            'http://localhost:5000/pokedex/create',
            {
                method: 'POST',
                body: JSON.stringify(this.state.form),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(data => data.json())
            .then(response =>{
                this.props.updateRoster(response)
            })
            .catch((e)=>console.log(e))
            

    }

    render() {
        return (
            < form >
                <h1>Create Pokemon</h1>
                <div className="form-group">
                    <label htmlFor="input-pokemon">Pokemon Name</label>
                    <input type="text" data-name="pokemonName" onChange={this.handleChange} className="form-control" id="pokemon" aria-describedby="pokeHelp" placeholder="Enter Pokename" />
                </div>
                <div className="form-group">
                    <label htmlFor="input-username">Image</label>
                    <input type="text" data-name="pokemonImg" onChange={this.handleChange} className="form-control" id="username" placeholder="Username" />
                </div>

                <div className="form-group">
                    <label htmlFor="input-password">Pokemon Info</label>
                    <input type="text" data-name="pokemonInfo" onChange={this.handleChange} className="form-control" id="exampleInputPassword1" placeholder="Info" />
                </div>
                <button type="button" onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
            </form >
        )
    }
}

export default AddPokemonForm