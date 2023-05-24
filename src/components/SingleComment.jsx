
import React from "react";
import styles from "../styles/SingleComment.module.css";



export default function SingleComment({comment}){

    if(typeof comment ==='undefined'){
        return null
    }
    return(
        
        <div className={styles['comment-card']}>
            <p>{comment.author}</p>
            <p>{comment.content}</p>
            <p>{new Date(comment.date).toDateString()}</p>
        </div> 
    )
}