import React, { Component } from 'react'
import Navigation from '../common/Navigation';
import PostList from '../post/PostList';

export default class Catalog extends Component {
    render = () => {
        return (
            <React.Fragment>
                <Navigation />
                <PostList/>
            </React.Fragment>
        )
    }
}