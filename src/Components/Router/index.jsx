/**
 * Router component that defines the application's routing structure using React Router.
 *
 * This component sets up the routes for the application, including paths for the home page,
 *  individual venue page, user profile, login, and registration. It wraps the routes
 * within a `Layout` component to provide a consistent layout across all pages.
 *
 * @component
 * @returns {JSX.Element} The Router component containing the application's route definitions.
 */

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Stays from "../PAGES/Stays";
import DisplayAStay from "../PAGES/DisplayAStay";
import Register from "../PAGES/Register";
import Login from "../PAGES/Login";
import Profile from "../PAGES/Profile";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Stays />} />
            <Route path="/Stay/:id" element={<DisplayAStay />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/MyProfile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
