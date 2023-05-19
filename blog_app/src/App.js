import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';


function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createPost = async () => {
    try {
      await axios.post('/api/posts', { title, content });
      setTitle('');
      setContent('');
      getPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const getPost = async (id) => {
  try {
    const response = await axios.get(`/api/posts/${id}`);
    console.log(response.data); // Do something with the post data
  } catch (error) {
    console.error(error);
  }
};

  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`);
      getPosts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Blog Posts</h1>
      <form>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="button" onClick={createPost}>
          Create Post
        </button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button type="button" onClick={() => deletePost(post.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div>
        <h1>Blog Posts</h1>
        {/* Render a specific post with ID 1 */}
        <Post postId={1} />
      </div>
    </div>
  );
}

export default App;