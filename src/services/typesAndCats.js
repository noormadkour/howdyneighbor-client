export const getPostTypes = () => {
    const currentUser = JSON.parse(localStorage.getItem("current_user"));
  
    if (currentUser && currentUser.token) {
      return fetch(`http://localhost:8000/posttypes`, {
        method: "GET",
        headers: {
          Authorization: `Token ${currentUser.token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    }
}

export const getCategories = () => {
    const currentUser = JSON.parse(localStorage.getItem("current_user"));
  
    if (currentUser && currentUser.token) {
      return fetch(`http://localhost:8000/categories`, {
        method: "GET",
        headers: {
          Authorization: `Token ${currentUser.token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    }
}