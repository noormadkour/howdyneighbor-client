import { useEffect, useState } from "react";
import { getNeighborById } from "../services/userService";

export const Profile = ({ currentUser }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    getNeighborById(currentUser.neighbor_id).then(userObj => setUser(userObj))
  }, [currentUser])

  if (!user) {
    return <div>Loading...</div>; // Or any other loading indicator
  }
  
  return (
    <div>
      Profile Page for {user.full_name} at address: {user.address}, and {user.bio}
    </div>
  );
}