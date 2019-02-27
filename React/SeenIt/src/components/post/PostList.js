import React, { Component } from 'react'
import '../../styles/post.css';
import Post from './Post';

import fetcher from '../../infrastructure/fetcher'



export default class PostList extends Component {
    constructor(props){
        super(props)
        this.state={posts:[]}
    }

    async getPosts(){
        const res=await fetcher.getAllPosts()
        this.setState({
            posts:res
        })
    }

    componentDidMount(){
        this.getPosts()
    }

    render = () => {
        // console.log(this.state);
        return (
            <section id="viewCatalog">
                {this.state.posts.map((p, i) => <Post key={p._id} index={i} {...p} />)}
            </section>
        )
    }
}