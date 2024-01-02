import { useState, useEffect } from 'react';
import { getPosts } from '../../services/postService';
import { useNavigate } from 'react-router-dom';
import './EventCarousel.css';

export const EventCarousel = () => {
    const [events, setEvents] = useState([]);
    const EVENT_POST_TYPE_ID = 3; // The ID for Event post types
    const navigate = useNavigate();

    useEffect(() => {
        getPosts().then((fetchedPosts) => {
            const eventPosts = fetchedPosts.filter(
                (post) => post.post_type.id === EVENT_POST_TYPE_ID
            );
            setEvents(eventPosts);
        });
    }, []);

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
        <div className="event-carousel bg-white shadow-lg rounded-lg p-4 m-2">
            <h2 className="text-2xl font-bold mb-4">Events</h2>
            <div className="horizontal-scroll-container">
                {events.length > 0 ? (
                    events.map((event, index) => (
                        <div
                            key={index}
                            className="event-item"
                            onClick={() => navigate(`/posts/${event.id}`)}
                        >
                            <h3 className="text-xl font-bold">{event.title}</h3>
                            <p className="text-sm text-gray-600">
                                Hosted by: {event.author.user.first_name} {event.author.user.last_name}
                            </p>
                            <p className="text-sm text-gray-500">
                                Event on: {new Date(event.event_date).toLocaleDateString()}
                            </p>
                            <p className="text-gray-700">{event.content}</p>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">Loading events...</div>
                )}
            </div>
            <div className="navigation-buttons">
                <button onClick={handlePrevious} className="navigation-button">
                    <i className="fas fa-arrow-left"></i>
                </button>
                <button onClick={handleNext} className="navigation-button">
                    <i className="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    );
};
