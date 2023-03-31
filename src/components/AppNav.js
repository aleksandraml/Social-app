import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./AppNav.css";

const AppNav = (props) => {

    const handleLogOut = () => {
        axios.post("http://akademia108.pl/api/social-app/user/logout")
        .then(response => {
           if(response.data.message) {
            localStorage.setItem("user", null)
            props.setUser(null)
           }
        })
    }

    return (
        <nav className="mainNav animate-charcter">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {!props.user &&
                    <li>
                        <Link to="/login">Login</Link>
                    </li>}

                {!props.user && <li>
                    <Link to="/signup">Sign Up</Link>
                </li>}
                {props.user && <li>
                    <Link to="/" onClick={handleLogOut}>Log out</Link>
                </li>}

            </ul>

        </nav>
    );
}

export default AppNav;



