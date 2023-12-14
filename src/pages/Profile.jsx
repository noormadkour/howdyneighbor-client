import { useEffect, useState } from "react";
import { getNeighborById } from "../services/userService";

export const Profile = ({ currentUser }) => {
  const [user, setUser] = useState([])

  useEffect(() => {
    getNeighborById(currentUser.neighbor_id).then(userObj => setUser(userObj))
  }, [currentUser])

    return `Profile Page for ${user?.user?.full_name} at address: ${user.address}, and ${user.bio}`;
  };