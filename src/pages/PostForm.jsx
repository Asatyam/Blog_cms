import React, { useEffect } from "react";
import { AuthContext } from "./context";
import { useState,useContext } from "react";
import { useRouter } from "next/router";
import styles from "../styles/PostForm.module.css"
import Login from "@/components/Login";
import axios from "axios";
import { useSearchParams } from 'next/navigation';

export default function PostForm(){



    const router = useRouter();
    const searchParams = useSearchParams();
    const x = searchParams.get('post');
    const post = JSON.parse(x);


    const condition = typeof post ==='undefined' || post===null || false;
    console.log(post);
    console.log(condition);
    const temp1 = condition? '' : post.title;
    const temp2 = condition? "" : post.content;
    const [title,setTitle] = useState(temp1);
    const [content, setContent] = useState(temp2);

    const {auth,setAuth} = useContext(AuthContext);

  useEffect(()=>{
     const  user = localStorage.getItem('user');
     console.log(user);
      if (!user) {
        setAuth(false);
      }
      else{
        setAuth(true);
      }
  },[auth,setAuth])
  

  if (!auth) {
    return <Login/>;
  }

    const handleSubmit = (e)=>{
        e.preventDefault();

       
          const token = JSON.parse(localStorage.getItem('token'));
            if(!token){
                alert("You are not authorized");
            }
           const config = {
                headers: {Authorization: `Bearer ${token}`}
           }

            if(condition){
        axios.post("http://localhost:4000/api/posts",{title,content},config)
        .then((res)=>{
            console.log(res);
            router.push('/');
        })
        .catch(console.log)
        }
        else{
            axios.put(`http://localhost:4000/api/posts/${post._id}`,{title,content},config)
        .then((res)=>{
            console.log(res);
            router.push('/');
        })
        .catch(console.log)
        }
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
                <button type ="submit">{condition?'Create':'Update'}</button>
            </form>
        </div>
    )


}