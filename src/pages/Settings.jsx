import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  editCategory,
  deleteCategory,
  getPostTypes,
  createPostType,
  editPostType,
  deletePostType,
} from "../services/typesAndCats";

export const Settings = ({ currentUser }) => {
  const [postTypes, setPostTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [showCreatePostType, setShowCreatePostType] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newPostType, setNewPostType] = useState("");
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [updatedCategoryName, setUpdatedCategoryName] = useState("");
  const [showEditPostType, setShowEditPostType] = useState(false);
  const [editingPostType, setEditingPostType] = useState(null);
  const [updatedPostTypeName, setUpdatedPostTypeName] = useState("");

  useEffect(() => {
    getPostTypes().then(setPostTypes);
    getCategories().then(setCategories);
  }, []);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    await createCategory({ label: newCategory });
    setNewCategory("");
    setShowCreateCategory(false);
    getCategories().then(setCategories);
  };

  const handleCreatePostType = async (e) => {
    e.preventDefault();
    await createPostType({ type: newPostType });
    setNewPostType("");
    setShowCreatePostType(false);
    getPostTypes().then(setPostTypes);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setUpdatedCategoryName(category.label);
    setShowEditCategory(true);
  };

  const handleSaveEditCategory = async (e) => {
    e.preventDefault();
    await editCategory({ id: editingCategory.id, label: updatedCategoryName });
    setShowEditCategory(false);
    getCategories().then(setCategories);
  };

  const handleEditPostType = (postType) => {
    setEditingPostType(postType);
    setUpdatedPostTypeName(postType.type);
    setShowEditPostType(true);
  };

  const handleSaveEditPostType = async (e) => {
    e.preventDefault();
    await editPostType({ id: editingPostType.id, type: updatedPostTypeName });
    setShowEditPostType(false);
    getPostTypes().then(setPostTypes);
  };

  const handleDeleteCategory = async (categoryId) => {
    await deleteCategory({ id: categoryId });
    getCategories().then(setCategories);
  };

  const handleDeletePostType = async (postTypeId) => {
    await deletePostType({ id: postTypeId });
    getPostTypes().then(setPostTypes);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between bg-white/95 rounded-lg">
        <div className="w-1/2 p-4">
          <h2 className="text-xl font-bold mb-2">Categories</h2>
          <button
            onClick={() => setShowCreateCategory(true)}
            className="text-green-500 hover:text-green-700"
          >
            <i className="fas fa-plus-circle"></i> Create New
          </button>
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex justify-between items-center bg-green-100 p-2 rounded my-2 shadow-md"
            >
              <span>{category.label}</span>
              {currentUser.admin && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              )}
            </div>
          ))}
          {showEditCategory && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
              <div className="relative top-20 mx-auto p-5 border w-1/3 shadow-lg rounded-md bg-white">
                <form onSubmit={handleSaveEditCategory}>
                  <input
                    type="text"
                    value={updatedCategoryName}
                    onChange={(e) => setUpdatedCategoryName(e.target.value)}
                    placeholder="Category"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 mt-2"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setShowEditCategory(false)}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-2"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}
          {showCreateCategory && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
              <div className="relative top-20 mx-auto p-5 border w-1/3 shadow-lg rounded-md bg-white">
                <form onSubmit={handleCreateCategory}>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Category"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 mt-2"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setShowCreateCategory(false)}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-2"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
        <div className="w-1/2 p-4">
          <h2 className="text-xl font-bold mb-2">Post Types</h2>
          <button
            onClick={() => setShowCreatePostType(true)}
            className="text-green-500 hover:text-green-700"
          >
            <i className="fas fa-plus-circle"></i> Create New
          </button>
          {postTypes.map((postType) => (
            <div
              key={postType.id}
              className="flex justify-between items-center bg-green-100 p-2 rounded my-2 shadow-md"
            >
              <span>{postType.type}</span>
              {currentUser.admin && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditPostType(postType)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => handleDeletePostType(postType.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              )}
            </div>
          ))}
          {showEditPostType && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
              <div className="relative top-20 mx-auto p-5 border w-1/3 shadow-lg rounded-md bg-white">
                <form onSubmit={handleSaveEditPostType}>
                  <input
                    type="text"
                    value={updatedPostTypeName}
                    onChange={(e) => setUpdatedPostTypeName(e.target.value)}
                    placeholder="Post Type"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 mt-2"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setShowEditPostType(false)}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-2"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}
          {showCreatePostType && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
              <div className="relative top-20 mx-auto p-5 border w-1/3 shadow-lg rounded-md bg-white">
                <form onSubmit={handleCreatePostType}>
                  <input
                    type="text"
                    value={newPostType}
                    onChange={(e) => setNewPostType(e.target.value)}
                    placeholder="Post Type"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 mt-2"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setShowCreatePostType(false)}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-2"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
