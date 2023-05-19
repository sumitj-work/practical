import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Post = ({ postId }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
};

export default Post;
