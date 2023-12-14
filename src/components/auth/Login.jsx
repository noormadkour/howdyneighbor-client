import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../managers/AuthManager";

export const Login = ({ setUser }) => {
  const username = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [isUnsuccessful, setIsUnsuccessful] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      username: username.current.value,
      password: password.current.value,
    };

    loginUser(user).then((res) => {
      if ("token" in res && res.token) {
        setUser(res);
        navigate("/");
      } else {
        setIsUnsuccessful(true);
      }
    });
  };

  return (
    <section className="login-container pt-[5%] pl-10 pr-10 flex items-center justify-center">
      <div className="form-div bg-white custom-border-radius p-8 min-h-[50vh] w-[50vw] flex items-center justify-center custom-shadow">
        <form className="flex flex-col w-3/4" onSubmit={handleLogin}>
          <h1 className="text-2xl font-bold mb-4">Meowdy, Neighbor!</h1>
          <p className="text-lg mb-6">Please sign in</p>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="mt-1">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                ref={username}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-md font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="mt-1">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                ref={password}
              />
            </div>
          </div>

          <div className="flex justify-around items-center mb-6">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
            <Link
              to="/register"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </Link>
          </div>

          {isUnsuccessful && (
            <p className="text-red-500 text-xs italic">
              Username or password not valid
            </p>
          )}
          <div className="mt-4 text-center">
            <p className="text-gray-700">
              Not yet registered?
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-800"
              >
                {`\t`}Click here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
