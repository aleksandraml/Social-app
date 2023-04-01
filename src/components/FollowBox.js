import "./FollowBox.css";

import { useEffect, useState } from "react";
import axios from "axios";

const FollowRecommendations = (props) => {

    const [recommendations, setRecommendations] = useState([]);

    const getRecommendations = () => {
        axios.post('https://akademia108.pl/api/social-app/follows/recommendations')
            .then((res) => {
                // console.log(res.data)
                setRecommendations(res.data)
            })
            .catch((error) => {
                console.log(error);
            });

    };



    useEffect(() => {
        getRecommendations()

    }, [])

    const follow = (id) => {
        axios.post("http://akademia108.pl/api/social-app/follows/follow", {
            leader_id: id,
        })
            .then(() => {
                props.getLatestPosts();
            })
            .catch((error) => {
                console.log(error);
            })
    }



    // console.log(followsBox.avatar.username)

    return (
        <div className="followBox">
            {recommendations.map(recommendation => {

                return (
                    <div className="follow" key={recommendation.id}>
                        <img src={recommendation.avatar_url} alt={recommendation.username} />
                        <h3>{recommendation.username}</h3>
                        <button className="thisBtn" onClick={() => follow(recommendation.id)}>Follow</button>
                    </div>
                )
            })}
        </div>
    );
}


export default FollowRecommendations;