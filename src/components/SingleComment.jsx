
import React from "react";
import styles from "../styles/SingleComment.module.css";

import axios from "axios";

export default function SingleComment({comment,postid}){

    if(typeof comment ==='undefined'){
        return null
    }
    const deleteComment = (e)=>{
         const ans  = confirm("Are you sure you want to delete this comment\n" + comment.content);
        if(ans)
        {
            const token = JSON.parse(localStorage.getItem('token'));
            if(!token){
                alert("You are not authorized");
            }
           const config = {
                headers: {Authorization: `Bearer ${token}`}
           }
           axios.delete(`http://localhost:4000/api/posts/${postid}/comments/${comment._id}`,config)
           .then((res)=>{
            console.log(res);
           })
           .catch(console.log);
           
        }
    }
    return(
        
        <div className={styles['comment-card']}>
            <p>{comment.author}</p>
            <p>{comment.content}</p>
            <p>{new Date(comment.date).toDateString()}</p>
            <button className={styles.delete} onClick={deleteComment}>Delete comment</button>
        </div> 
    )
}