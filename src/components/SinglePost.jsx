import React from "react";
import styles from "../styles/SinglePost.module.css"

export default function SinglePost({post}){

    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <div className={styles.title}>
                    <h1>{post.title}</h1>
                </div>
                <div className = {styles.author}>
                    -{post.author.username}
                </div>
            </div>
            <div className={styles.content}>
                    {post.content}
                    
            </div>
            
        </div>
    )

}