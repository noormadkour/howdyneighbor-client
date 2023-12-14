import { useEffect, useState } from "react";
import { getCategories, getPostTypes } from "../services/typesAndCats";

export const Settings = ({ currentUser }) => {
  const [postTypes, setPostTypes] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getPostTypes().then(postTypeArray => setPostTypes(postTypeArray));
    getCategories().then(categoryArray => setCategories(categoryArray))
  }, [])
    return `Settings Page for ${currentUser.name} There are ${categories.length} Categories, and ${postTypes.length} post types.`;
  };