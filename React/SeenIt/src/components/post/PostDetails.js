import React, { Component, Fragment } from 'react'
import fetcher from './../../infrastructure/fetcher'
import Navigation from './../common/Navigation'
import CommentForm from '../comments/CommentForm'

export default class PostDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            url: '',
            description: '',
            author: '',
            imageUrl: ''
        }
    }

    componentDidMount = () => {
        let id = this.props.match.params.id
        fetcher.findPostById(id)
            .then(({post}) => {
                this.setState({
                    title: post.title,
                    url: post.url,
                    description: post.description,
                    author: post.author.username,
                    imageUrl: post.imageUrl
                })
            })
            .catch(console.log())
    }


    render = () => {
        return (
            <Fragment>
             <Navigation />
            <section id="viewPostDetails">
                <article id="postDetails" className="post">
                    <div className="col thumbnail">
                        <img src={this.state.url} alt="img" />
                    </div>
                    <div className="post-content">
                        <div className="title">
                            <strong>{this.state.title}</strong>
                        </div>
                        <div className="details">
                            {this.state.description}
                        </div>
                        <span>
                            {/* Created by {this.state.author}  */}
                        </span>
                    </div>
                </article>

                <CommentForm extraState={{postId: this.state._id}} success={this.addComment} />

                {/* <CommentsList comments={this.state.comments} remove={this.removeComment} /> */}

            </section>
            </Fragment>
        )
    }
}