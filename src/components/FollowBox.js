import { useEffect, useState } from "react";
import axios from "axios";

const FollowsBox = (props) => {

    const [followsBox, setFollowsBox] = useState([]);

    const getFollows = () => {
        axios.post('https://akademia108.pl/api/social-app/follows/recommendations')
            .then((res) => {
                // console.log(res.data)
                setFollowsBox(res.data)
            })
            .catch((error) => {
                console.log(error);
            });

    };



    useEffect(() => {
        getFollows()

    }, [])

    

    // console.log(followsBox.avatar.username)

    return (
        <div className="followBox">
            {followsBox.map(followBox => {
                 
                return (
                    <div className="follow" key={followBox.id}>
                        <img src={followBox.avatar_url} alt={followBox.username} />
                        <h3>recommendation username</h3>
                        <button className="btn">Follow</button>
                    </div>
                )
            })}
        </div>
    );
}


export default FollowsBox;