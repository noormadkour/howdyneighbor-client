import { NavLink, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white/90 custom-shadow custom-border-radius py-4 px-6 m-3">
      <ul className="flex justify-around items-center">
        <li>
          <NavLink
            className="text-gray-700 hover:text-purple-700 px-4 py-2 text-lg font-medium"
            to={"/"}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className="text-gray-700 hover:text-purple-700 px-4 py-2 text-lg font-medium"
            to={"/posts"}
          >
            Posts
          </NavLink>
        </li>
        <li>
          <NavLink
            className="text-gray-700 hover:text-purple-700 px-4 py-2 text-lg font-medium"
            to={"/profile"}
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            className="text-gray-700 hover:text-purple-700 px-4 py-2 text-lg font-medium"
            to={"/settings"}
          >
            Settings
          </NavLink>
        </li>
        {localStorage.getItem("current_user") !== null && (
          <li>
            <button
              className="text-gray-700 hover:text-purple-700 px-4 py-2 text-lg font-medium rounded-md"
              onClick={() => {
                localStorage.removeItem("current_user");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};