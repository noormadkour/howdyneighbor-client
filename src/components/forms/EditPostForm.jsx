import { useState, useEffect } from "react";
// import { updatePost } from "../../services/postService";
import { getCategories } from "../../services/typesAndCats";

export const EditPost = ({ post, onSave, onClose }) => {
  const [editedPost, setEditedPost] = useState(post);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(
    new Set(post.categories.map((c) => c.id))
  );

  useEffect(() => {
    setEditedPost(post);
    getCategories().then(setCategories);
    setSelectedCategories(new Set(post.categories.map((c) => c.id)));
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPost({ ...editedPost, [name]: value });
  };

  const handleCategoryChange = (categoryId) => {
    const newSelectedCategories = new Set(selectedCategories);
    if (newSelectedCategories.has(categoryId)) {
      newSelectedCategories.delete(categoryId);
    } else {
      newSelectedCategories.add(categoryId);
    }
    setSelectedCategories(newSelectedCategories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const updatedPost = {
      id: editedPost.id,
      post_type: editedPost.post_type.id,
      title: editedPost.title,
      event_date: editedPost.event_date,
      image_url: editedPost.image_url,
      content: editedPost.content,
      approved: editedPost.approved,
      categories: Array.from(selectedCategories),
    };
    console.log(updatedPost)
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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