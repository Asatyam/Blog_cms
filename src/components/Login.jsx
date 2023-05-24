import React from "react";
import { useState } from "react";
import axios from "axios";
import styles from '../styles/Login.module.css'
export default function Login({setAuth}){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();

        const body = {username, password};
        axios.post("http://localhost:4000/api/login",body)
        .then((res)=>{
            localStorage.setItem('user',JSON.stringify(res.data.body.username));
            localStorage.setItem('token',JSON.stringify(res.data.token));
            setAuth(true);
        }).catch(err=>console.log(err));
    }

    const handleUsername = (e)=>{
        setUsername(e.target.value);
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }

    return (
        <div className = {styles['form-container']}>
            <form onSubmit={handleSubmit}>
                <div className = {styles.username}>
                    <label htmlFor="username">Username</label>
                    <input name="username" type="text" id= "username" required value = {username} onChange ={handleUsername}/>
                </div>
                <div className = {styles.password}>
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" id= "password" required value = {password} onChange ={handlePassword}/>
                </div>
                <button type='submit' className={styles.submit}>Login</button>
            </form>
        </div>
    )
}