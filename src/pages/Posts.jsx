import { useEffect, useState } from "react";
import { getPosts } from "../services/postService";
import { useNavigate, Link } from "react-router-dom";

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts().then((postArray) => setPosts(postArray));
  }, []);
  return (
    <main className="text-slate-900 pt-[5%] pl-10 pr-10 flex flex-col items-center justify-center">
      <div className="bg-white custom-border-radius pt-5 pb-10 px-20 min-h-[70vh] w-[90vw] flex flex-col items-center justify-center custom-shadow">
        <h1 className="text-4xl mb-4">Posts</h1>
        <button
          onClick={() => navigate("/new-post")}
          className="self-end px-6 py-2 mb-4 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600"
        >
          New Post
        </button>
        {/* <div className="mb-4">There are {posts.length} posts.</div> */}
        <div className="w-full">
          {posts.map((post, index) => (
            <Link to={`/posts/${post.id}`} key={post.id} className="mb-4 block">
              <div
                key={index}
                className="mb-4 p-6 rounded-lg shadow-lg bg-green-100 hover:bg-green-200 transition duration-300"
              >
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p>{post.content}</p>
                {/* Include other post details you wish to display */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};
