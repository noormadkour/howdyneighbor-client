import { NavLink, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <ul className="navbar">
      <div className="navbar-item flex flex-row justify-around">
        <li className="navbar__item">
          <NavLink
            className="text-left  text-white hover:text-purple-700"
            to={"/"}
          >
            Home
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            className="text-left  text-white hover:text-purple-700"
            to={"/posts"}
          >
            Posts
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            className="text-left  text-white hover:text-purple-700"
            to={"/profile"}
          >
            Profile
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            className="text-left  text-white hover:text-purple-700"
            to={"/settings"}
          >
            Settings
          </NavLink>
        </li>
        {localStorage.getItem("current_user") !== null ? (
          <li className="navbar__item">
            <button
              className=" text-white hover:text-purple-700"
              onClick={() => {
                localStorage.removeItem("current_user");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </li>
        ) : (
          <>
          </>
        )}
      </div>
    </ul>
  );
};
