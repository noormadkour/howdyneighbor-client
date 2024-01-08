import { useState, useEffect } from "react";
import { getPosts } from "../../services/postService";
import { useNavigate } from "react-router-dom";
import "./RequestCarousel.css";

export const RequestCarousel = () => {
  const [requests, setRequests] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const REQUEST_POST_TYPE_ID = 1;
  const navigate = useNavigate();

  useEffect(() => {
    getPosts().then((fetchedPosts) => {
      const requestPosts = fetchedPosts.filter(
        (post) => post.post_type.id === REQUEST_POST_TYPE_ID
      );
      setRequests(requestPosts);
    });
  }, []);

  useEffect(() => {
    if (!isPaused) {
      const rotateInterval = setInterval(() => {
        setTransitioning(true);
        setTimeout(() => {
          setRequests((prevRequests) => [
            ...prevRequests.slice(1),
            prevRequests[0],
          ]);
          setTransitioning(false);
        }, 500); // Match this timeout with your CSS transition duration
      }, 2000);
      return () => clearInterval(rotateInterval);
    }
  }, [requests, isPaused]);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day); // Months are 0-indexed in JavaScript Date
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white m-2 custom-shadow-2 rounded-lg ">
      <div className="flex items-center justify-around">
        <h2 className="text-2xl font-bold p-2">Requests</h2>
      </div>
      <div className="ml-[88%]">
        <button onClick={() => setIsPaused(!isPaused)} className="text-xl">
          <i
            className={
              isPaused
                ? "fas fa-play text-green-400"
                : "fas fa-pause text-red-400"
            }
          ></i>
        </button>
      </div>
      <div className="request-carousel bg-white p-4 h-96 overflow-y-auto custom-scrollbar rounded-lg">
        {requests.length > 0 ? (
          <ul
            className={
              transitioning ? "carousel-item-exiting" : "carousel-item-entered"
            }
          >
            {requests.map((request, index) => (
              <li
                key={index}
                className="mb-2 p-4 cursor-pointer rounded-lg bg-green-100 hover:bg-green-200 shadow transition duration-300 flex flex-col justify-between"
                onClick={() => navigate(`/posts/${request.id}`)}
              >
                <div className="header flex justify-between mb-2">
                  <h3 className="text-xl font-bold">{request.title.length > 25
                      ? request.title.substring(0, 25) + "..."
                      : request.title}</h3>
                  <p className="text-sm text-gray-600 ml-2">
                    {request.author.user.first_name}{" "}
                    {/* {request.author.user.last_name} */}
                  </p>
                </div>

                <div className="body">
                  <p className="text-sm text-gray-600">
                    {request.content.length > 100
                      ? request.content.substring(0, 100) + "..."
                      : request.content}
                  </p>
                </div>

                <div className="footer flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-500">
                    {formatDate(request.publication_date)}
                  </p>
                  <div className="flex items-center">
                    <i className="fas fa-comments text-gray-600 mr-1"></i>
                    <span className="text-sm">{request.comments.length}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500">Loading requests...</div>
        )}
      </div>
    </div>
  );
};
