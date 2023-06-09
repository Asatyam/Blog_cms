/* eslint-disable @next/next/no-img-element */
import React from "react";
import Navbar from "./Navbar";
import styles from  "../styles/Layout.module.css"
export default function Layout({children}){

    return(
       <div className={styles.layout}>
       <Navbar/>
       {children}
       </div>
    )
}