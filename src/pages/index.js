import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Login from '@/components/Login'
import { useEffect, useState,useContext } from 'react'
import axios from 'axios'
import PostCard from '@/components/PostCard'
import { AuthContext } from './context'
import { LoadingScreen } from '@/components/LoadingScreen'
const inter = Inter({ subsets: ['latin'] })


export default function Home({posts}) {

  const {auth,setAuth} = useContext(AuthContext);
   const [loading, setLoading] = useState(true);

  useEffect(()=>{
     const  user = localStorage.getItem('user');
     console.log(user);
      if (!user) {
        setAuth(false);
        
      }
      else{
        setAuth(true);
        setLoading(false);
      }
  },[auth,setAuth])
  
  if (loading) {
    return <LoadingScreen />;
  }

  if (!auth) {
    return <Login/>;
  }

  return (
    <div className={styles.home}>
      {posts.map(post=>
      <PostCard key={post._id} post={post} />)}
    </div>
  );
}
export async function getServerSideProps(){
  const res = await axios.get('https://blogapi-asatyam.onrender.com/api/posts');
  const posts = res.data;

  return {props:{posts} }
}
