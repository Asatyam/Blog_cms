import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import SinglePost from '@/components/SinglePost';
import { AuthContext } from '@/pages/context';
import Login from '@/components/Login';
import { LoadingScreen } from '@/components/LoadingScreen';
export default function Post({ post }) {

    const {auth,setAuth} = useContext(AuthContext);
   
    const [loading, setLoading] = useState(true);
    
     useEffect(() => {

       const user = localStorage.getItem('user');
       console.log(user);
       if (!user) {
         setAuth(false);
       } else {
         setAuth(true);
         setLoading(false);
       }
     }, [auth, setAuth]);

     if (loading) {
       return <LoadingScreen />;
     }
     
     if (!auth) {
       return <Login />;
     }
  return <SinglePost post={post} />;
}

export async function getStaticPaths() {
  let res = await axios.get('https://blogapi-asatyam.onrender.com/api/posts');
  const posts = res.data;

  const paths = posts.map((post) => `/posts/${post._id}`);
  return { paths, fallback: false };
}
export async function getStaticProps({ params }) {
  const res = await axios.get(
    `https://blogapi-asatyam.onrender.com/api/posts/${params.id}`
  );
  const post = res.data.post;
  return {
    props: { params, post },
  };
}
