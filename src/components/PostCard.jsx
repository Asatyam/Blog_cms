import React from "react";
import styles from "../styles/PostCard.module.css"
import Link from "next/link";
import { AuthContext } from "@/pages/context";
import { useContext } from "react";
import Login from "./Login";
export default function PostCard({post}){

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
        </div>
    )
}