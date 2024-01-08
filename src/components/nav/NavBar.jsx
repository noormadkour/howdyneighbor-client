import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export const NavBar = () => {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("current_user");
    navigate("/login");
  };

  const LogOutDialog = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="bg-white p-20 custom-border-radius shadow-xl">
        <p className="text-lg pb-4 mb-4">Are you sure you want to logout?</p>
        <div className="flex justify-around">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => setShowLogoutDialog(false)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <nav className="bg-white/75 custom-shadow custom-border-radius py-4 px-6 m-2">
      <ul className="flex justify-around items-center">
        <li>
          <NavLink
            className={({ isActive }) =>
            isActive
              ? "text-gray-700 px-4 py-2 text-xl font-bold"
              : "text-gray-700 hover:text-green-700 px-4 py-2 text-lg font-medium"
          }
            to={"/"}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
            isActive
              ? "text-gray-700 px-4 py-2 text-xl font-bold"
              : "text-gray-700 hover:text-green-700 px-4 py-2 text-lg font-medium"
          }
            to={"/posts"}
          >
            Posts
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
            isActive
              ? "text-gray-700 px-4 py-2 text-xl font-bold"
              : "text-gray-700 hover:text-green-700 px-4 py-2 text-lg font-medium"
          }
            to={"/profile"}
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
            isActive
              ? "text-gray-700 px-4 py-2 text-xl font-bold"
              : "text-gray-700 hover:text-green-700 px-4 py-2 text-lg font-medium"
          }
            to={"/settings"}
          >
            Settings
          </NavLink>
        </li>
        {localStorage.getItem("current_user") !== null && (
          <li>
            <button
              className="text-gray-700 hover:text-red-700 px-4 py-2 text-lg font-medium rounded-md"
              onClick={() => setShowLogoutDialog(true)}
            >
              <i className="fas fa-sign-out-alt mr-2"></i>Logout
            </button>
          </li>
        )}
      </ul>
      {showLogoutDialog && <LogOutDialog />}
    </nav>
  );
};