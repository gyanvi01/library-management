// import React from "react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Outlet, Link } from "react-router-dom";

const Login = () => {

    const [userlogin, setUserlogin] = useState({
        name:"",
        password:""
    });

    const [loginstatus, setLoginstatus] = useState("")

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUserlogin(prev=>({...prev, [e.target.name]: e.target.value }));
    }

    const handleClick = async e => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:8800/login", userlogin).then ((response) =>{
                if(response.data.message){
                    setLoginstatus(response.data.message)
                }
                else{
                    // setLoginstatus(response.data[0])
                    navigate("/books")
                }
            })
            // navigate("/login")

        }catch(err){
            console.log(err)
        }
    }

    console.log(userlogin)


    return (
        <div className="form">
            <h1>Login</h1>
            <input type="text" placeholder="Username" onChange={handleChange} name="name"/>
            <input type="password" placeholder="Password" onChange={handleChange} name="password"/>
            <button className="formButton" onClick={handleClick}>Login</button>
            <button className="formButton">
                <Link to="/Register">Register</Link>
            </button>
            {/* <button className="formButton">Register</button> */}

            <h1>{loginstatus}</h1>

        </div>
    )
}

export default Login