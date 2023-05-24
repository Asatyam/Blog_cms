import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Login from '@/components/Login'
import { useEffect, useState } from 'react'
import axios from 'axios'
import PostCard from '@/components/PostCard'

const inter = Inter({ subsets: ['latin'] })

export default function Home({posts}) {

  const [auth, setAuth] = useState(false);

  useEffect(()=>{
     const  user = localStorage.getItem('user');
     console.log(user);
      if (!user) {
        setAuth(false);
      }
      else{
        setAuth(true);
      }
  },[auth])
  

  if (!auth) {
    return <Login setAuth={setAuth} />;
  }

  return (
    <div className={styles.home}>
      {posts.map(post=>
      <PostCard key={post._id} post={post} />)}
    </div>
  );
}
export async function getServerSideProps(){
  const res = await axios.get('http://localhost:4000/api/posts')
  const posts = res.data;

  return {props:{posts} }
}
