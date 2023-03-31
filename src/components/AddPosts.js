import "./AddPosts.css";

import { useState } from "react";
import React from "react";

import axios from "axios";

const AddPosts = (props) => {

    const [postContent, setPostContent] = useState("");

    const addPosts = (e) => {
        e.preventDefault();

        if(!postContent) {
            return;
        }

        axios.post("http://akademia108.pl/api/social-app/post/add", {
            content: postContent
        })
        .then((res)=> {
            props.getPrevPosts();
            setPostContent("")
        })
        .catch((error)=> {
            console.log(error);
        })

    };

    return (
        <form onSubmit={addPosts}>
            <textarea placeholder="Add post..." onChange={(e) => setPostContent(e.target.value)}
                value={postContent}
            ></textarea>
            <button className="btn">Add</button>
        </form>
       
    );
};



export default AddPosts;