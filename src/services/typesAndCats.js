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
};

export const createPostType = (newPostType) => {
  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  if (currentUser && currentUser.token) {
    return fetch(`http://localhost:8000/posttypes`, {
      method: "POST",
      headers: {
        Authorization: `Token ${currentUser.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPostType),
    }).then((res) => res.json());
  }
};

export const editPostType = (editedPostType) => {
  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  if (currentUser && currentUser.token) {
    return fetch(`http://localhost:8000/posttypes/${editedPostType.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${currentUser.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedPostType),
    });
  }
};

export const deletePostType = (postType) => {
  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  if (currentUser && currentUser.token) {
    return fetch(`http://localhost:8000/posttypes/${postType.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${currentUser.token}`,
        "Content-Type": "application/json",
      },
    });
  }
};

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
};

export const createCategory = (newCategory) => {
  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  if (currentUser && currentUser.token) {
    return fetch(`http://localhost:8000/categories`, {
      method: "POST",
      headers: {
        Authorization: `Token ${currentUser.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    }).then((res) => res.json());
  }
};

export const editCategory = (editedCategory) => {
  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  if (currentUser && currentUser.token) {
    return fetch(`http://localhost:8000/categories/${editedCategory.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${currentUser.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedCategory),
    });
  }
};

export const deleteCategory = (category) => {
  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  if (currentUser && currentUser.token) {
    return fetch(`http://localhost:8000/categories/${category.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${currentUser.token}`,
        "Content-Type": "application/json",
      },
    });
  }
};
