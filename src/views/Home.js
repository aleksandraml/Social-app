import "./Home.css";
import axios from 'axios'

import AddPosts from "../components/AddPosts";
import Post from "../components/Posts";


import React, { useState, useEffect } from 'react';
import FollowBox from "../components/FollowBox";

const Home = (props) => {

  const [posts, setPosts] = useState([])

  const getLatestPosts = () => {
    axios.post('http://akademia108.pl/api/social-app/post/latest')
      .then(response => {
        setPosts(response.data)
        
      })
      .catch(error => console.error(error));
  }

  const getNextPosts = () => {
    axios.post('https://akademia108.pl/api/social-app/post/older-then', {
      date: posts[posts.length - 1].created_at
    })
      .then(response => {
        setPosts(posts.concat(response.data))
      })
      .catch(error => console.error(error));
  }

  const getPrevPosts = () => {
    axios.post('https://akademia108.pl/api/social-app/post/newer-then', {
      date: posts[0].created_at
    })
      .then(response => {
        setPosts(response.data.concat(posts))
      })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    getLatestPosts()
  }, [props.user]);

  return (
    <div>

      <div>
        {props.user && <AddPosts getPrevPosts={getPrevPosts} />}
        {props.user && <FollowBox user={props.user} getLatestPosts={getLatestPosts} post={posts} />}

        <div className="postList">
          {posts.map(post => {

            return <Post key={post.id} post={post} user={props.user} setPosts={setPosts} />
          })}
        </div>
        <button onClick={getNextPosts} className="btn">Load more</button>

      </div>
    </div>

  );
}



export default Home;
