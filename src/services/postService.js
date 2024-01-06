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
};

export const updatePost = (updatedPost) => {
  console.log(updatedPost)
  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  if (currentUser && currentUser.token) {
    return fetch(`http://localhost:8000/posts/${updatedPost.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${currentUser.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    });
  }
};

export const deletePost = (postId) => {
  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  if (currentUser && currentUser.token) {
    return fetch(`http://localhost:8000/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${currentUser.token}`,
        "Content-Type": "application/json",
      },
    });
  }
}

export const getPostById = (postId) => {
  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  if (currentUser && currentUser.token) {
    return fetch(`http://localhost:8000/posts/${postId}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${currentUser.token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }
};

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
};

export const postComment = async (commentData, token) => {
  return fetch("http://localhost:8000/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(commentData),
  }).then((res) => res.json());
};

export const editComment = (commentObj) => {
  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  if (currentUser && currentUser.token) {
    return fetch(`http://localhost:8000/comments/${commentObj.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${currentUser.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentObj),
    });
  }
}

export const deleteComment = (commentObj) => {
  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  if (currentUser && currentUser.token) {
    return fetch(`http://localhost:8000/comments/${commentObj.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${currentUser.token}`,
        "Content-Type": "application/json",
      },
    });
  }
}