import React from 'react';

class CreateForm extends React.Component  {
    constructor(props){
        super(props)
        this.state={
            title:null,
            description:null,
            imageUrl:null
        }
        this.handleChange=this.handleChange.bind(this)
    }
    
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render(){
        return (
            <div className="create-form">
                <h1>Create game</h1>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    this.props.createGame(this.state)
                    
                    // TODO: prevent the default behaviour of the click event, call the createGame function and pass it the data from the form
                }}>
                    <label>Title</label>
                    <input type="text" name="title" onChange={this.handleChange} id="title"/>
                    <label>Description</label>
                    <textarea type="text" name="description" onChange={this.handleChange} id="description"/>
                    <label>ImageUrl</label>
                    <input type="text" name="imageUrl" onChange={this.handleChange} id="imageUrl"/>
                    <input type="submit" value="Create"/>
                </form>
            </div>
        )
    }
    
};

export default CreateForm;

