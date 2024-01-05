import { useEffect, useState } from "react";
import { getPostTypes, getCategories } from "../../services/typesAndCats";
import "./Form.css"

export const PostForm = ({ onPostAdded, onCancel }) => {
  const [postTypes, setPostTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [chosenCategories, updateChosenCategories] = useState(new Set());
  const [post, setPost] = useState({
    post_type: 0,
    title: "",
    publication_date: new Date(),
    event_date: null,
    image_url: "",
    content: "",
    approved: true,
  });

  useEffect(() => {
    getPostTypes().then((postTypeArray) => setPostTypes(postTypeArray));
    getCategories().then((categoryArray) => setCategories(categoryArray));
  }, []);

  const updatePost = (e) => {
    const copy = { ...post };
    copy[e.target.id] = e.target.value;
    setPost(copy);
  };

  const updatePostType = (e) => {
    const copy = { ...post };
    copy.post_type = e.target.value;
    setPost(copy);
  };

  const handleChosenCategories = (c) => {
    const copy = new Set(chosenCategories);
    copy.has(c.id) ? copy.delete(c.id) : copy.add(c.id);
    updateChosenCategories(copy);
  };

  const handleDateChange = (e) => {
    const copy = { ...post };
    copy.event_date = e.target.value;
    setPost(copy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract token from local storage
    const currentUser = JSON.parse(localStorage.getItem("current_user"));
    const token = currentUser.token;

    // Prepare the request body
    const postBody = {
      ...post,
      categories: Array.from(chosenCategories),
      accept_rsvp: post.post_type == 3, // Replace with actual ID
    };

    // Fetch request options
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(postBody),
    };

    try {
      const response = await fetch(
        "http://localhost:8000/posts",
        requestOptions
      );
      if (response.ok) {
        onPostAdded();
      } else {
        const errorResponse = await response.json();
        console.error("Error submitting post:", errorResponse);
      }
    } catch (error) {
      console.error("Error posting post:", error);
    }
  };

  return (
    <di className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 w-[50%] shadow-lg custom-border-radius px-20 py-10 bg-white">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-center mb-6">New Post Form</h1>

          <div>
            <label className="block text-md font-medium text-gray-700">
              Post Type
            </label>
            <select
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              id="post_type"
              onChange={updatePostType}
              value={post.post_type}
              required
            >
              <option value={0}>Please select a Post Type</option>
              {postTypes.map((typeObj) => (
                <option key={typeObj.id} value={typeObj.id}>
                  {typeObj.type}
                </option>
              ))}
            </select>
          </div>

          {post.post_type == 3 && (
            <div>
              <label className="block text-md font-medium text-gray-700">
                Event Date
              </label>
              <input
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                type="date"
                id="event_date"
                onChange={handleDateChange}
                value={post.event_date}
              />
            </div>
          )}

          <div>
            <label className="block text-md font-medium text-gray-700">
              Title
            </label>
            <input
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              type="text"
              id="title"
              onChange={updatePost}
              value={post.title}
              required
            />
          </div>

          {/* <div>
            <label className="block text-md font-medium text-gray-700">
              Image URL
            </label>
            <input
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              type="text"
              id="image_url"
              onChange={updatePost}
              value={post.image_url}
            />
          </div> */}

          <div>
            <label className="block text-md font-medium text-gray-700">
              Content
            </label>
            <textarea
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              id="content"
              onChange={updatePost}
              value={post.content}
              required
              maxLength={200}
            />
            <p className="text-right text-xs text-gray-500">
              Max Characters: 200
            </p>
          </div>

          <div>
            <label className="block text-md font-medium text-gray-700">
              Categories
            </label>
            <div className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2 categories-scrollbar">
              <div className="grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <label key={c.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={chosenCategories.has(c.id)}
                      onChange={() => handleChosenCategories(c)}
                    />
                    <span>{c.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-around mt-6 p-3">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Post
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </di>
  );
};
