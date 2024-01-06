import { useState, useEffect } from "react";
// import { updatePost } from "../../services/postService";
import { getCategories, getPostTypes } from "../../services/typesAndCats";

export const EditPost = ({ post, onSave, onClose }) => {
  const [editedPost, setEditedPost] = useState(post);
  const [selectedPostTypeId, setSelectedPostTypeId] = useState(post.post_type.id);
  const [categories, setCategories] = useState([]);
  const [postTypes, setPostTypes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(
    new Set(post.categories.map((c) => c.id))
  );
  const EVENT_POST_TYPE_ID = 3

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
    if (name === 'post_type') {
      setSelectedPostTypeId(parseInt(value));
    }
  };

  const handleCategoryChange = (categoryId) => {
    const newSelectedCategories = new Set(selectedCategories);
    newSelectedCategories.has(categoryId) ? newSelectedCategories.delete(categoryId) : newSelectedCategories.add(categoryId);
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
      <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg custom-border-radius px-20 py-10 bg-white">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">Edit Post</h2>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={editedPost.title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Post Type</label>
            <select
              name="post_type"
              value={selectedPostTypeId}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {postTypes.map(pt => (
                <option key={pt.id} value={pt.id}>
                  {pt.type}
                </option>
              ))}
            </select>
          </div>

          {selectedPostTypeId === EVENT_POST_TYPE_ID && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Event Date
            </label>
            <input
              type="date"
              name="event_date"
              value={editedPost.event_date || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Content
            </label>
            <textarea
              name="content"
              value={editedPost.content}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700">
              Categories
            </label>
            <div className="flex flex-wrap justify-between gap-2 mt-2">
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

          <div className="flex items-center justify-between">
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
