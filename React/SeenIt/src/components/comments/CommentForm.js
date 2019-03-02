import React, { Component } from 'react'
// import {Redirect} from 'react-router-dom'


import withFormManager from '../hoc/withFormManager';
import fetcher from '../../infrastructure/fetcher';

class CommentsForm extends Component {


    render = () => {
        console.log(this.props.postId);        
        return (
            <div className="submitArea">
                <h1>Post Comment</h1>
                <form id="createCommentForm" className="submitForm" onSubmit={this.props.handleSubmit}>
                    <label>Content:</label>
                    <input id="cmtContent" name="content" onChange={this.props.handleChange} value={this.props.content}/>
                    <input type="submit" value="Post Comment"/>
                </form>
            </div>
        )
    }
                                    
}

export default withFormManager(CommentsForm,null,fetcher.createComment(this.state))