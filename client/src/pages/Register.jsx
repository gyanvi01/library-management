// import React from "react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Outlet, Link } from "react-router-dom";

const Register = () => {

    const [account, setAccount] = useState({
        name:"",
        email:"",
        password:""
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        setAccount(prev=>({...prev, [e.target.name]: e.target.value }));
    }

    const handleClick = async e => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:8800/register", account)
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }

    console.log(account)

    return (
        <div className="form">
            <h1>Register</h1>
            <input type="text" placeholder="Name" onChange={handleChange} name="name"/>
            <input type="text" placeholder="email" onChange={handleChange} name="email"/>
            <input type="password" placeholder="Password" onChange={handleChange} name="password"/>
            <button className="formButton" onClick={handleClick}>Register</button>
            <button className="formButton" ><Link to="/">Login</Link></button>

        </div>
    )
}

export default Register