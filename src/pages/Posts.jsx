import { useEffect, useState } from "react";
import { getPosts } from "../services/postService";

export const Posts = ({ currentUser }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts().then(postArray => setPosts(postArray))
  }, [])
    return `Post Page for ${currentUser.name}. There are ${posts.length} posts`;
  };