import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPostById,
  getComments,
  postComment,
  updatePost,
  editComment,
  deleteComment,
  deletePost,
} from "../services/postService";
import { EditPost } from "../components/forms/EditPostForm";

export const PostDetails = ({ currentUser }) => {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const { postId } = useParams();

  const fetchComments = async () => {
    const updatedComments = await getComments();
    const filteredComments = updatedComments.filter(
      (comment) => comment.post.id === parseInt(postId)
    );
    setComments(filteredComments);
  };

  useEffect(() => {
    getPostById(postId).then(setPost);
    fetchComments();
  }, [postId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const currentUser = JSON.parse(localStorage.getItem("current_user"));
    const commentData = {
      post: postId,
      content: newComment,
      created_on: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
    };

    await postComment(commentData, currentUser.token);
    getComments().then((allComments) => {
      const updatedComments = allComments.filter(
        (comment) => comment.post.id === parseInt(postId)
      );
      setComments(updatedComments);
    });

    setNewComment("");
  };

  if (!post) {
    return <div>Loading post details...</div>;
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async (editedPost) => {
    try {
      await updatePost(editedPost); // Update the post
      const updatedPost = await getPostById(postId); // Re-fetch the updated post details
      setPost(updatedPost); // Update the state with the latest post details
      setIsEditing(false); // Close the edit modal
    } catch (error) {
      console.error("Error updating post:", error);
      // Handle error (e.g., show a message to the user)
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      try {
        await deletePost(postId);
        // After successful deletion, navigate back to the posts list or home page
        navigate('/posts'); // Uncomment and use React Router's navigate
        // Or trigger some state change to indicate that the post has been deleted
      } catch (error) {
        console.error("Error deleting post:", error);
        // Handle error (e.g., show a message to the user)
      }
    }
  };

  const handleEditCommentClick = (comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  // Handle save edited comment
  const handleSaveEditComment = async (commentObj) => {
    const updatedComment = {
      id: commentObj.id,
      post: commentObj.post.id, // Assuming post is the post object from the state
      author: commentObj.author.id, // Assuming currentUser has neighbor_id
      content: editingContent,
    };
    await editComment(updatedComment);
    await fetchComments();
    setEditingCommentId(null); // Reset editing state
  };

  // Handle cancel edit
  const handleCancelEditComment = () => {
    setEditingCommentId(null);
  };

  // Handle delete comment
  const handleDeleteComment = async (commentObj) => {
    await deleteComment(commentObj);
    await fetchComments();
  };

  const canEditDeleteComment = (comment) => {
    return comment.is_owner || currentUser.admin;
  };

  return (
    <div className="bg-white px-20 py-5 custom-border-radius shadow-lg my-6">
      {(post.is_owner || currentUser.admin) && (
        <div className="flex justify-end pr-10 space-x-2">
          <button
            onClick={handleEdit}
            className="text-blue-500 hover:text-blue-700"
          >
            <i className="fas fa-pencil-alt fa-lg mx-4"></i> {/* Edit Icon */}
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
          >
            <i className="fas fa-trash-alt m-4"></i> {/* Delete Icon */}
          </button>
        </div>
      )}
      <h1 className="text-3xl font-extrabold mb-3">{post.title}</h1>
      <h2 className="text-xl mb-1 pb-4">{post.post_type.type}</h2>
      <p className="mb-1">
        By: {post.author.user.first_name} {post.author.user.last_name}
      </p>
      <p className="mb-1">Date: {post.event_date || post.publication_date}</p>
      <p className="mb-4">{post.content}</p>

      <div className="my-4">
        <h2 className="font-bold text-xl mb-2">Categories</h2>
        {post.categories.map((category) => (
          <span
            key={category.id}
            className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {category.label}
          </span>
        ))}
      </div>

      {isEditing && (
        <EditPost
          post={post}
          onSave={handleSaveEdit}
          onClose={() => setIsEditing(false)}
        />
      )}

      <div className="my-4">
        <h2 className="font-bold text-xl mb-2">Comments</h2>

        {comments.map((comment, index) => (
          <div
            key={index}
            className="bg-gray-100 p-2 my-2 rounded flex justify-between"
          >
            {editingCommentId === comment.id ? (
              // Edit mode
              <div className="flex-grow">
                <textarea
                  className="w-full rounded-md border border-gray-300 shadow-sm p-2"
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                ></textarea>
                <button
                  onClick={() => handleSaveEditComment(comment)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  <i className="fas fa-check"></i>
                </button>
                <button
                  onClick={handleCancelEditComment}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  <i className="fas fa-undo"></i>
                </button>
              </div>
            ) : (
              // Normal comment display
              <div className="flex-grow">
                <p>{comment.content}</p>
                <p className="text-sm text-gray-600">
                  by: {comment.author.full_name}
                </p>
              </div>
            )}
            {canEditDeleteComment(comment) && (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditCommentClick(comment)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <i className="fas fa-edit mx-4"></i>
                </button>
                <button
                  onClick={() => handleDeleteComment(comment)}
                  className="text-red-500 hover:text-red-700"
                >
                  <i className="fas fa-times fa-lg mx-4"></i>{" "}
                </button>
              </div>
            )}
          </div>
        ))}

        <form onSubmit={handleSubmitComment} className="mt-4">
          <textarea
            className="w-full rounded-md border border-gray-300 shadow-sm p-2"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          ></textarea>
          <button
            type="submit"
            className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};

// {comments.map((comment, index) => (
//   <div
//     key={index}
//     className="bg-gray-100 p-2 my-2 rounded flex justify-between"
//   >
//     <div>
//       <p>{comment.content}</p>
//       <p className="text-sm text-gray-600">
//         by: {comment.author.full_name}
//       </p>
//     </div>
//     {canEditDeleteComment(comment) && (
//       <div className="flex space-x-2">
//         <button className="text-blue-500 hover:text-blue-700">
//           <i className="fas fa-edit mx-4"></i> {/* Edit Icon */}
//         </button>
//         <button className="text-red-500 hover:text-red-700">
//           <i className="fas fa-times fa-lg mx-4"></i>{" "}
//           {/* Delete Icon */}
//         </button>
//       </div>
//     )}
//   </div>
// ))}
