import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import "./Home.css";
import "./Login.css";

const Login = (props) => {

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [loginMessage, setLoginMessage] = useState('');

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;

        setFormData({
            ...formData,
            [name]: target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        axios.post('http://akademia108.pl/api/social-app/user/login', {
            username: formData.username,
            password: formData.password,
        })
            .then(response => {
                
                if(Array.isArray(response.data.username)) {
                    setLoginMessage(response.data.username[0]);
                } else if(Array.isArray(response.data.password)) {
                    setLoginMessage(response.data.password[0]);
                }else if(response.data.error) {
                    setLoginMessage('Incorrect username or password');
                }else {
                    setLoginMessage('');
                    props.setUser(response.data);
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                props.setUser(response.data)
                localStorage.setItem( 'user', JSON.stringify(response.data))
            })
            .catch(error => console.error(error));
    }

    return (

        <div className="Login">
           
            {props.user && <Navigate to="/" />}

            <form onSubmit={handleSubmit}>
                {loginMessage && <h2>{loginMessage}</h2>}
                <input type="text" name="username" placeholder="username" value={formData.username} onChange={handleInputChange} />
                <input type="password" name="password" placeholder="password" value={formData.password} onChange={handleInputChange} />
                <button className="btn">Log in</button>
            </form>
        </div>
    );
}

export default Login;