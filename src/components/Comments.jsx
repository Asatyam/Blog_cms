import React, { useState,useEffect } from "react";
import SingleComment from "./SingleComment"
import styles from "../styles/Comments.module.css"
import axios from "axios";

export default function Comments({id}){

    const [comments, setComments] = useState([]);

    useEffect(()=>{
        axios.get(`https://blogapi-asatyam.onrender.com/api/posts/${id}/comments`)
        .then((res)=>{
            setComments(res.data);
        })
        .catch(err=>setComments(null))
    },[id,comments]);

    if(comments === null){
        return (
              <div className="comments">
                    No Comments yet
        </div>
        )
    }
    return (
        <div className={styles.comments}>

            {comments.map((comment)=> <SingleComment key= {comment._id} comment={comment} postid = {id}/>)}
        </div>
    )

}