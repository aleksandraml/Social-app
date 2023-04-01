import { useState } from "react";
import axios from "axios";
import "./Post.css";


import like from './like.png';



const Post = (props) => {
    const [likeCount, setLikeCount] = useState(props.post.likes.length);
    const [doesUserLiked, setDoesUserLiked] = useState(props.post.likes.filter((like) => like.username === props.user?.username).length !== 0);

    const likePost = (id, isLiked) => {
        axios.post("https://akademia108.pl/api/social-app/post/" + (isLiked ? "dislike" : "like"), {
            post_id: id
        }).then(() => {
            setLikeCount(likeCount + (isLiked ? -1 : 1));
            setDoesUserLiked(!isLiked)
        })


    };

    const unfollow = (id) => {
        axios.post("http://akademia108.pl/api/social-app/follows/disfollow", {
            leader_id: id,
        })
            .then(() => {
                props.getLatestPosts();
            })
            .catch((error) => {
                console.log(error);
            })
    };


    const deletePost = (id) => {
        axios.post("https://akademia108.pl/api/social-app/post/delete", {
            post_id: id
        })
            .then((res) => {
                //   res.text('Post deleted!')
                props.setPosts((posts) => {
                    return (
                        posts.filter((post) =>
                            post.id !== res.data.post_id
                        )
                    )
                })
            })
            .catch((error) => {
                console.log(error);
            })

    }

    return (



        <div className="post">
            <div className="avatar">
                <img src={props.post.user.avatar_url} alt="avatar" />
            </div>

            <div className="postData">
                <div className="postMeta">
                    {props.post.created_at.substring(0, 10)}
                </div>

                <div className="author">
                    {props.post.user.username}
                </div>
                <div className="content">
                    {props.post.content}
                </div>
                <div className="likes">
                    <span>l</span>
                    <span>i</span>
                    <span>k</span>
                    <span >e</span>
                    <span >s</span>
                    <span>:</span>
                    {props.post.likes.length}
                </div>
                <button onClick={() => { deletePost(props.post.id) }}>Delete post</button>

                {props.user && props.user.username !== props.post.username && (<button className="btn" onClick={()=>unfollow(props.post.user.id)}>Unfollow</button>)}

                {props.user && (
                    <img src={like} alt="like" onClick={() => likePost(props.post.id, doesUserLiked)} />)}



            </div>
        </div>
    );

}

// constructor(props) {
//   super(props);

//   this.state = {
//     posts: [],

//   };
// }


export default Post;

