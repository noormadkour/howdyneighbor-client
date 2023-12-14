export const getNeighborById = (neighbor_id) => {
    const currentUser = JSON.parse(localStorage.getItem("current_user"));
  
    if (currentUser && currentUser.token) {
      return fetch(`http://localhost:8000/users/${neighbor_id}`, {
        method: "GET",
        headers: {
          Authorization: `Token ${currentUser.token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    }
}