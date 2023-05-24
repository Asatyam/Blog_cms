import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import SinglePost from '@/components/SinglePost';
import { AuthContext } from '@/pages/context';
import Login from '@/components/Login';
export default function Post({ post }) {

    const {auth} = useContext(AuthContext);
    
    if(!auth){
        return <Login/>
    }
  
  return <SinglePost post={post} />;
}

export async function getStaticPaths() {
  let res = await axios.get('http://localhost:4000/api/posts');
  const posts = res.data;

  const paths = posts.map((post) => `/posts/${post._id}`);
  return { paths, fallback: false };
}
export async function getStaticProps({ params }) {
  const res = await axios.get(`http://localhost:4000/api/posts/${params.id}`);
  const post = res.data.post;
  return {
    props: { params, post },
  };
}
