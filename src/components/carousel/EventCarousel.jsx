import { useState, useEffect } from "react";
import { getPosts } from "../../services/postService";
import { useNavigate } from "react-router-dom";
import "./EventCarousel.css";

export const EventCarousel = () => {
  const [events, setEvents] = useState([]);
  const EVENT_POST_TYPE_ID = 3; // The ID for Event post types
  const navigate = useNavigate();

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format

    getPosts().then((fetchedPosts) => {
      const eventPosts = fetchedPosts
        .filter((post) => post.post_type.id === EVENT_POST_TYPE_ID)
        .filter((event) => event.event_date >= currentDate); // Filter out past events

      setEvents(eventPosts);
    });
  }, []);

  // const formatDate = (dateString) => {
  //   const [year, month, day] = dateString.split("-").map(Number);
  //   const date = new Date(year, month - 1, day); // Months are 0-indexed in JavaScript Date
  //   return date.toLocaleDateString();
  // };

  const formatLongDate = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day); // Months are 0-indexed in JavaScript Date
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const handleNext = () => {
    const container = document.querySelector(".horizontal-scroll-container");
    const itemWidth = container.querySelector(".event-item").offsetWidth;
    container.scrollBy({ left: itemWidth, behavior: "smooth" });
  };

  const handlePrevious = () => {
    const container = document.querySelector(".horizontal-scroll-container");
    const itemWidth = container.querySelector(".event-item").offsetWidth;
    container.scrollBy({ left: -itemWidth, behavior: "smooth" });
  };

  return (
    <div className="event-carousel bg-white custom-shadow-2 rounded-lg m-2 h-[96.5%]">
      <h2 className="text-2xl font-bold mb-10">Upcoming Events</h2>
      <div className="horizontal-scroll-container">
        {events.length > 0 ? (
          events.map((event, index) => (
            <>
              <div
                key={index}
                className="event-item flex flex-col justify-between p-3 h-[300px]"
                onClick={() => navigate(`/posts/${event.id}`)}
              >
                {/* Header */}
                <div className="header">
                  <h3 className="text-xl font-bold text-center">
                    {event.title}
                  </h3>
                  <p className="text-center text-sm">
                    {formatLongDate(event.event_date)}
                  </p>
                </div>

                {/* Body */}
                <div className="body text-gray-700 mb-4">
                  <p className="p-3 text-md">{event.content}</p>
                </div>

                {/* Footer */}
                <div className="footer flex justify-between items-center text-sm text-gray-600">
                  <p className="">
                    Hosted by: {event.author.user.first_name}{" "}
                    {event.author.user.last_name}
                  </p>
                  <div className="flex items-center">
                    <i className="fas fa-comments text-gray-600 mr-1"></i>
                    <span className="text-sm">{event.comments.length}</span>
                  </div>
                </div>
              </div>
              <div className="navigation-buttons">
                <button onClick={handlePrevious} className="navigation-button">
                  <i className="fas fa-arrow-left"></i>
                </button>
                <button onClick={handleNext} className="navigation-button">
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </>
          ))
        ) : (
          <div className="text-center text-gray-500">Loading events...</div>
        )}
      </div>
    </div>
  );
};
