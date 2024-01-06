import { useEffect, useState } from "react";
import { getNeighborById } from "../services/userService";
import { getComments, getPosts } from "../services/postService";
import { Link, useNavigate } from "react-router-dom";
import "./Posts.css";

export const Profile = ({ currentUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    getNeighborById(currentUser.neighbor_id).then((userObj) =>
      setUser(userObj)
    );
    getPosts().then((posts) => {
      const filteredPosts = posts.filter(
        (post) => post.author.id === currentUser.neighbor_id
      );
      setUserPosts(filteredPosts);
    });

    // Fetch all comments and filter them by the current user's ID
    getComments().then((comments) => {
      const filteredComments = comments.filter(
        (comment) => comment.author.id === currentUser.neighbor_id
      );
      setUserComments(filteredComments);
    });
  }, [currentUser]);

  if (!user) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return (
    <div className="flex w-full my-6 -center">
      <div className=" flex flex-col w-1/4 custom-border-radius bg-white/95 mx-10 p-10 custom-shadow h-[400px] items-center">
        <img
          src={user.profile_image}
          alt={`${user.full_name}'s profile`}
          className="rounded-full shadow-lg mb-4 "
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
        />
        <h1 className="text-3xl font-bold">{user.full_name}</h1>
        <p className="text-md">{user.bio}</p>
        <p className="text-md">{user.address}</p>
        <a href={`mailto:${user.user.email}`} className="text-blue-500">
          {user.user.email}
        </a>
      </div>

      <div className="flex-3 p-8 bg-white/95 rounded-lg shadow-lg flex custom-shadow max-h-[100vh]">
        <div className="w-1/2 pr-4">
          <h2 className="text-2xl font-bold mb-4">Posts</h2>
          <div className="posts-scrollbar overflow-y-auto max-h-[60vh]">
            {userPosts.map((post) => (
              <Link
                to={`/posts/${post.id}`}
                key={post.id}
                className="block p-4 rounded-lg shadow-md bg-green-100 mb-4"
              >
                <h3 className="font-bold">{post.title}</h3>
                <p>{post.content}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-1/2 pl-4">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <div className="posts-scrollbar overflow-y-auto max-h-[60vh]">
            {userComments.map((comment, index) => (
              <div
                key={index}
                className="bg-gray-100 p-2 my-2 rounded cursor-pointer shadow-md"
                onClick={() => navigate(`/posts/${comment.post.id}`)}
              >
                <p>{comment.content}</p>
                <p className="text-sm text-gray-600">
                  On post: {comment.post.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
