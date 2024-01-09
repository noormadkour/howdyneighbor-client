import { useState, useEffect } from "react";
// import { updatePost } from "../../services/postService";
import { getCategories, getPostTypes } from "../../services/typesAndCats";

export const EditPost = ({ post, onSave, onClose }) => {
  const [editedPost, setEditedPost] = useState(post);
  const [selectedPostTypeId, setSelectedPostTypeId] = useState(
    post.post_type.id
  );
  const [categories, setCategories] = useState([]);
  const [postTypes, setPostTypes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(
    new Set(post.categories.map((c) => c.id))
  );
  const EVENT_POST_TYPE_ID = 3;

  useEffect(() => {
    setEditedPost(post);
    getCategories().then(setCategories);
    getPostTypes().then(setPostTypes);
    setSelectedPostTypeId(post.post_type.id);
    setSelectedCategories(new Set(post.categories.map((c) => c.id)));
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPost({ ...editedPost, [name]: value });
    if (name === "post_type") {
      setSelectedPostTypeId(parseInt(value));
    }
  };

  const handleCategoryChange = (categoryId) => {
    const newSelectedCategories = new Set(selectedCategories);
    newSelectedCategories.has(categoryId)
      ? newSelectedCategories.delete(categoryId)
      : newSelectedCategories.add(categoryId);
    setSelectedCategories(newSelectedCategories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = {
      id: editedPost.id,
      post_type: selectedPostTypeId,
      title: editedPost.title,
      event_date: editedPost.event_date,
      image_url: editedPost.image_url,
      content: editedPost.content,
      approved: editedPost.approved,
      categories: Array.from(selectedCategories),
    };
    onSave(updatedPost);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 w-[50%] shadow-lg custom-border-radius px-20 py-10 bg-white">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-center mb-6">Edit Post</h2>

          <div>
            <label className="block text-md font-medium text-gray-700">
              Post Type
            </label>
            <select
              name="post_type"
              value={selectedPostTypeId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            >
              {postTypes.map((pt) => (
                <option key={pt.id} value={pt.id}>
                  {pt.type}
                </option>
              ))}
            </select>
          </div>

          {selectedPostTypeId === EVENT_POST_TYPE_ID && (
            <div>
              <label className="block text-md font-medium text-gray-700">
                Event Date
              </label>
              <input
                type="date"
                name="event_date"
                value={editedPost.event_date || ""}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          )}

          <div>
            <label className="block text-md font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={editedPost.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label className="block text-md font-medium text-gray-700">
              Content
            </label>
            <textarea
              name="content"
              value={editedPost.content}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            ></textarea>
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
                      checked={selectedCategories.has(c.id)}
                      onChange={() => handleCategoryChange(c.id)}
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
              Save Changes
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
