import React from "react";
import { AuthContext } from "./context";
import { useState,useContext } from "react";
import { useRouter } from "next/router";
import styles from "../styles/PostForm.module.css"
import Login from "@/components/Login";
import axios from "axios";
export default function PostForm({post}){

    const {auth} =useContext(AuthContext);

    const router = useRouter();
    const temp1 = typeof post ==='undefined'? "" : post.title;
    const temp2 = typeof post ==='undefined'? "" : post.content;
    const [title,setTitle] = useState(temp1);
    const [content, setContent] = useState(temp2);

    const handleSubmit = (e)=>{
        e.preventDefault();

          const token = JSON.parse(localStorage.getItem('token'));
            if(!token){
                alert("You are not authorized");
            }
           const config = {
                headers: {Authorization: `Bearer ${token}`}
           }

        axios.post("http://localhost:4000/api/posts",{title,content},config)
        .then((res)=>{
            console.log(res);
            router.push('/');
        })
        .catch(console.log)
    }
    const handleTitle = (e)=>{
        setTitle(e.target.value);
    }
    const handleContent = (e)=>{
        setContent(e.target.value);
    }
    if(!auth)
    {
        return <Login/>
    }
    return (
        <div className={styles.main}>
            <form onSubmit={handleSubmit}>
                <div className = {styles['form-item']}>
                    <label htmlFor = "title">Title</label>
                    <input type="text" name="title" id="title" required value = {title} onChange={handleTitle}/>
                </div>
                <div className = {styles['form-item']}>
                    <label htmlFor = "content">Content</label>
                    <textarea rows = '30' cols = '100' name="content" id="content" required value = {content} onChange={handleContent}/>
                </div>
                <button type ="submit">Create</button>
            </form>
        </div>
    )


}