import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount () {
        // axios uses a get request then chains onto a promise which calls an arrow function on the response
        // in the callback we set the state to the data property which is available in the repsonse object 
        // the data property holds an array of posts
        axios.get('/posts')
            .then(response => {
                // slice the array down to [0, 1, 2, 3]
                const posts = response.data.slice(0, 4);
                // map our array to insert a property into each object
                const updatedPosts = posts.map(post => {
                   return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({posts: updatedPosts});
            })
            .catch(error => {
                this.setState({error: true})
            });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong</p>
        if (!this.state.error) {
            // The map() method calls the provided function once for each element in an array
            posts = this.state.posts.map(post => {
                // return JSX
                return <Post 
                    key={post.id} 
                    title={post.title} 
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)}/>
            });
        }
        

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;