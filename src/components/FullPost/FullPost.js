import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidUpdate() {
        // if id is true
        if (this.props.id) {
            // if loadedPost is true or not & if its id is not equal value or not equal type to the props id
            if (!this.state.loadedPost || this.state.loadedPost && this.state.loadedPost.id !== this.props.id)
            // we use a GET request with a query string of our id
            axios.get('/posts/' + this.props.id)
                .then(response => {
                    // assign this object to the state
                    this.setState({loadedPost: response.data});
                })
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.id)
            .then(response => {
                console.log(response)
            });
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        // once id is true
        if (this.props.id) { 
            // loading... 
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }
        // if loadPost is true
        if (this.state.loadedPost) {
            // display to user
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
    
            );
        }
        return post;
    }   
}

export default FullPost;