import { useEffect, useState } from "react";
import { getPosts } from "../services/postService";
import { getPostTypes, getCategories } from "../services/typesAndCats";
import { Link } from "react-router-dom";
import { PostForm } from "../components/forms/PostForm";
import "./Posts.css";

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [postTypes, setPostTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedPostType, setSelectedPostType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showPostFormModal, setShowPostFormModal] = useState(false);

  useEffect(() => {
    getPosts().then(setPosts);
    getPostTypes().then(setPostTypes);
    getCategories().then(setCategories);
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

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = posts
    .filter(
      (post) =>
        !selectedPostType || post.post_type.id.toString() === selectedPostType
    )
    .filter(
      (post) =>
        !selectedCategory ||
        post.categories.some(
          (category) => category.id.toString() === selectedCategory
        )
    )
    .filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleClearFilter = () => {
    setSelectedPostType("");
    setSelectedCategory("");
    setSearchTerm("");
  };

  return (
    <main className="text-slate-900 pt-[0%] pl-10 pr-10 flex flex-col items-center justify-center">
      <div className="bg-white/[85%] custom-border-radius pt-5 pb-10 px-20 min-h-[70vh] max-h-[85vh] w-[90vw] flex flex-col items-center custom-shadow ">
        <h1 className="font-bold text-5xl mb-4">Posts</h1>
        <div className="flex justify-between w-full mb-4 pt-2 pb-6">
          <div className="flex items-center">
            {/* <label htmlFor="postTypeFilter" className="mr-2">
              Filter by Post Type:
            </label> */}
            <select
              id="postTypeFilter"
              value={selectedPostType}
              onChange={handlePostTypeChange}
              className="mx-4 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white text-gray-700 hover:border-gray-400 cursor-pointer"
            >
              <option value="">All Types</option>
              {postTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.type}
                </option>
              ))}
            </select>
            {/* <label htmlFor="categoryFilter" className="mr-2">
              Filter by Category:
            </label> */}
            <select
              id="categoryFilter"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="mx-4 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white text-gray-700 hover:border-gray-400 cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
            <div className="relative mx-4">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white text-gray-700"
              />
              <i className="fas fa-search absolute right-2 top-3 text-gray-400"></i>
            </div>
            <button
              onClick={handleClearFilter}
              className="ml-2 px-2 py-1 text-sm text-blue-500 hover:text-blue-700"
            >
              Clear
            </button>
          </div>
          <button
            onClick={togglePostFormModal}
            className="mt-1 mr-4 flex items-center px-4 py-2 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg transition duration-300 ease-in-out"
          >
            <i className="fas fa-plus-circle mr-2"></i> New Post
          </button>
        </div>
        <div className="posts-scrollbar w-full overflow-y-auto">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Link
                to={`/posts/${post.id}`}
                key={post.id}
                className="mb-4 block"
              >
                <div className="mb-4 p-6 rounded-lg shadow-lg bg-green-100 hover:bg-green-200 transition duration-700">
                  {/* Header: Title and Author */}
                  <div className="flex justify-between">
                    <h2 className="text-xl font-bold">{post.title}</h2>
                    <p className="text-sm text-gray-600">
                      By: {post.author.full_name}
                    </p>
                  </div>

                  {/* Body: Content, Post Type, and Categories */}
                  <div className="mb-3">
                    <p className="mb-3 font-medium text-sm text-gray-600 italic">
                      {post.post_type.type}
                    </p>
                    <p className="mb-2">{post.content}</p>
                    <div className="flex flex-wrap mt-2">
                      {post.categories.map((category) => (
                        <span
                          key={category.id}
                          className="bg-green-200 text-green-850 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-lg dark:bg-green-300 dark:text-green-900"
                        >
                          {category.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer: Comment Count and Date Posted */}
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center">
                      <i className="fas fa-comments mr-1"></i>
                      {post.comments
                        ? `${post.comments.length} Comments`
                        : "No Comments"}
                    </div>
                    <div>
                      Posted on:{" "}
                      {new Date(post.publication_date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="font-semibold text-center text-gray-600 pt-[10%]">
              -- No posts to show --
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
          </div>
        </div>
      )}
    </main>
  );
};
