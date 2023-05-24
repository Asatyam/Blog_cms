import React from "react";
import styles from "../styles/PostCard.module.css"
import Link from "next/link";
import { AuthContext } from "@/pages/context";
import { useContext } from "react";
import Login from "./Login";
import axios from "axios";
export default function PostCard({post}){

    const deletePost = (e)=>{

        const ans  = confirm("Are you sure you want to delete this post\n" + post.title);
        if(ans)
        {
            const token = JSON.parse(localStorage.getItem('token'));
            if(!token){
                alert("You are not authorized");
            }
           const config = {
                headers: {Authorization: `Bearer ${token}`}
           }
           axios.delete(`http://localhost:4000/api/posts/${post._id}`,config)
           .then((res)=>{
            console.log(res);
             location.reload();
           })
           .catch(console.log);
           
        }
        
    }

    const {auth} = useContext(AuthContext);
    if(!auth){
        return <Login/>
    }
    
    return(
       
        <div className={styles['post-card']}>
            <div className={styles.author}>
                {post.author?post.author.username:"Anonymous"}
            </div>
            <div className={styles.title}>
                <Link href={`/posts/${post._id}`} scroll={false}>
                        {post.title}
                </Link>
            </div>
            <div className={styles.date}>
                {post.date}
            </div>
            <button className={styles.delete} onClick = {deletePost}>
                Delete
            </button>
            <Link href={{ pathname: '/PostForm', query: { post: JSON.stringify(post) } }}>
                <button className={styles.update}>Update</button>
            </Link>
        </div>
    )
}