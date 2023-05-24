import React from "react";
import styles from '../styles/Navbar.module.css'
import { AuthContext } from "@/pages/context";
import { useContext } from "react";
import Link from "next/link";

export default function Navbar(){

    const {auth, setAuth} = useContext(AuthContext);
    const handleClick = (e)=>{
        
        localStorage.clear();
        setAuth(false);
    }
    if(!auth){
        return null
    }
    return(
        <nav className={styles.nav}>
           <Link href="/"><button>Home</button></Link> 
         
            <Link href="/PostForm">  <button>New Post</button></Link>
             
            <button onClick={handleClick}>
                Logout
            </button>
        </nav>
    )
}