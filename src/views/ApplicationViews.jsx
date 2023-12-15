import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { Home } from "../pages/Home";
import { Posts } from "../pages/Posts";
import { Profile } from "../pages/Profile";
import { Settings } from "../pages/Settings";
import { PostForm } from "../components/forms/PostForm";
import { PostDetails } from "../pages/PostDetails";
// import { EditPost } from "../components/forms/EditPostForm";

export const ApplicationViews = ({ currentUser, setUser }) => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route element={<Authorized currentUser={currentUser} />}>
            {/* Add Routes here */}
            <Route path="/" element={<Home currentUser={currentUser} />} />
            <Route
              path="/posts"
              element={<Posts currentUser={currentUser} />}
            />
            <Route
              path="/posts/:postId"
              element={<PostDetails currentUser={currentUser} />}
            />
            <Route
              path="/new-post"
              element={<PostForm currentUser={currentUser} />}
            />
            {/* <Route
              path="/edit-post/:postId"
              element={<EditPost currentUser={currentUser} />}
            /> */}
            <Route
              path="/profile"
              element={<Profile currentUser={currentUser} />}
            />
            <Route
              path="/settings"
              element={<Settings currentUser={currentUser} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
