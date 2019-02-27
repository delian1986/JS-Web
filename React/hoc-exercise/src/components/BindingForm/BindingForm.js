import React, { Component } from 'react';

class BindingForm extends Component {
    handleChange(e) {
        // console.log(`${e.target.name} => ${e.target.value}`);
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentWillMount(){
        this.props.children.forEach(child => {
            if(child.type === 'input'){
                this.setState({
                    [child.props.name]:null
                })
            }
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={(e)=>this.props.onSubmit(e,this.state)}>
                {React.Children.map(this.props.children, child => {
                    if (child.type === 'input') {
                        return React.cloneElement(child, { onChange: this.handleChange.bind(this), ...child })
                    }
                    return child
                })}
                <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default BindingForm;
