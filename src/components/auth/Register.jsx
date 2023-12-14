import { useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../managers/AuthManager";

export const Register = ({ setUser }) => {
  const firstName = useRef();
  const lastName = useRef();
  // const email = useRef();
  const username = useRef();
  const address = useRef();
  const profile_image = useRef();
  const bio = useRef();
  const password = useRef();
  const verifyPassword = useRef();
  const passwordDialog = useRef();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        // email: email.current.value,
        address: address.current.value,
        password: password.current.value,
        profile_image: profile_image.current.value,
        bio: bio.current.value,
      };
      
      registerUser(newUser).then((res) => {
        if ("token" in res && res.token) {
          setUser(res);
          navigate("/");
        }
      });
    } else {
      passwordDialog.current.showModal();
    }
  };

  return (
    <section className="login-container pt-[5%] pl-10 pr-10 flex items-center justify-center">
      <div className="form-div bg-white custom-border-radius p-8 min-h-[50vh] w-[50vw] flex items-center justify-center custom-shadow">
        <form className="flex flex-col w-2/3" onSubmit={handleRegister}>
          <h1 className="text-2xl font-bold mb-4">Howdy, Neighbor-to-be!</h1>
          <p className="text-lg mb-6">Create an account</p>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              ref={firstName}
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              ref={lastName}
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">
              Home Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              ref={address}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              ref={username}
            />
          </div>

          {/* <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              ref={email}
            />
          </div> */}



          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Password"
              ref={password}
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">
              Verify Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Verify Password"
              ref={verifyPassword}
            />
          </div>

          <div className="mb-6">
            <label className="block text-md font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Tell us about yourself..."
              ref={bio}
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-md font-medium text-gray-700 mb-2">
              Profile Picture
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="http://www.image.com"
              ref={profile_image}
            />
          </div>

          <div className="flex justify-around items-center mb-6">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
            <Link
              to="/login"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </Link>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-700">
              Already registered?
              <Link to="/login" className="text-blue-600 hover:text-blue-800">
                {`\t`}Click here to log in
              </Link>
            </p>
          </div>
        </form>
        <dialog
          ref={passwordDialog}
          className="rounded-lg p-4 bg-white shadow-xl"
        >
          <h3 className="text-lg font-bold">Password Mismatch</h3>
          <p className="py-4">
            The passwords you entered do not match. Please try again.
          </p>
          <button
            onClick={() => passwordDialog.current.close()}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Close
          </button>
        </dialog>
      </div>
    </section>
  );
};
