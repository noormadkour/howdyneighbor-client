import { useEffect, useState } from "react";
import { getPosts } from "../services/postService";
import { getPostTypes } from "../services/typesAndCats";
import { Link } from "react-router-dom";
import { PostForm } from "../components/forms/PostForm";
import "./Posts.css";

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [postTypes, setPostTypes] = useState([]);
  const [selectedPostType, setSelectedPostType] = useState("");
  const [showPostFormModal, setShowPostFormModal] = useState(false);

  useEffect(() => {
    getPosts().then(setPosts);
    getPostTypes().then(setPostTypes);
  }, []);

  const togglePostFormModal = () => {
    setShowPostFormModal(!showPostFormModal);
  };

  const refetchPosts = () => {
    getPosts().then(setPosts);
    togglePostFormModal(); // Close the modal after refetching
  };

  const handlePostTypeChange = (event) => {
    setSelectedPostType(event.target.value);
  };

  const filteredPosts = selectedPostType
    ? posts.filter((post) => post.post_type.id.toString() === selectedPostType)
    : posts;

  const handleClearFilter = () => {
    setSelectedPostType("");
  };

  return (
    <main className="text-slate-900 pt-[0%] pl-10 pr-10 flex flex-col items-center justify-center">
      <div className="bg-white/[85%] custom-border-radius pt-5 pb-10 px-20 min-h-[70vh] max-h-[85vh]  w-[90vw] flex flex-col items-center  custom-shadow ">
        <h1 className="text-4xl mb-4">Posts</h1>
        <div className="flex justify-between w-full mb-4 pt-2 pb-6">
          <div>
            <label htmlFor="postTypeFilter" className="mr-2">
              Filter by Post Type:
            </label>
            <select
              id="postTypeFilter"
              value={selectedPostType}
              onChange={handlePostTypeChange}
              className="px-3 py-2 rounded border border-gray-300"
            >
              <option value="">All Types</option>
              {postTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.type}
                </option>
              ))}
            </select>
            <button
              onClick={handleClearFilter}
              className="ml-2 px-2 py-1 text-sm text-blue-500 hover:text-blue-700"
            >
              Clear
            </button>
          </div>
          <button
            onClick={togglePostFormModal}
            className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-700"
          >
            New Post
          </button>
        </div>
        <div className="posts-scrollbar w-full overflow-y-auto">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <Link
                to={`/posts/${post.id}`}
                key={post.id}
                className="mb-4 block"
              >
                <div
                  key={index}
                  className="mb-4 p-6 rounded-lg shadow-lg bg-green-100 hover:bg-green-200 transition duration-300"
                >
                  <h2 className="text-xl font-bold">{post.title}</h2>
                  <p>{post.content}</p>
                  <p className="author font-extralight mt-3">
                    By: {post.author.full_name}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center text-gray-600">
              No posts of that type
            </div>
          )}
        </div>
      </div>
      {showPostFormModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 w-3/4 rounded-md">
            <PostForm
              onPostAdded={refetchPosts}
              onCancel={togglePostFormModal}
            />
            <button
              onClick={togglePostFormModal}
              className="close-modal-button"
            >
              {/* Close button styling */}
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
