export const getPosts = () => {
    const currentUser = JSON.parse(localStorage.getItem("current_user"));
  
    if (currentUser && currentUser.token) {
      return fetch(`http://localhost:8000/posts`, {
        method: "GET",
        headers: {
          Authorization: `Token ${currentUser.token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    }
}

export const getComments = () => {
  const currentUser = JSON.parse(localStorage.getItem("current_user"));
  
    if (currentUser && currentUser.token) {
      return fetch(`http://localhost:8000/comments`, {
        method: "GET",
        headers: {
          Authorization: `Token ${currentUser.token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    }
}