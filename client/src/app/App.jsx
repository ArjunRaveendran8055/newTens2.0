import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../layouts/Dashboard";

import Profile from "../pages/dashboard/profile";
import Notifications from "../pages/dashboard/Notifications";
import Table from "../pages/dashboard/Table";
import SignUp from "../pages/auth/SignUp";
import CustToastContainer from "../components/features/toast/ToastContainer";

import axios from "axios";
import ActivationPage from "../pages/auth/ActivationPage";
import Login from "../pages/auth/Login";
import SearchPage from "../pages/dashboard/SearchPage";
import PendingUsers from "../components/features/user/pendingUsers/PendingUsers";
import Loader from "../components/features/Loader/Loader";

import Home from "../pages/dashboard/home";
import StudentDetailsPage from "../pages/otherPages/StudentDetailsPage";
import DisplayClassesPage from "../pages/dashboard/DisplayClassesPage";
function App() {
  axios.defaults.baseURL = "http://localhost:8055";
  axios.defaults.withCredentials = true;
  return (
    <div className="">
      <CustToastContainer />

      <Loader />

      <Routes>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/activation/:activationToken"
          element={<ActivationPage />}
        />
        <Route path="" element={<Dashboard />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/tables" element={<Table />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/pendingusers" element={<PendingUsers />} />
          <Route path="/classes" element={<DisplayClassesPage />} />
          <Route path="/studentdetails/:id" element={<StudentDetailsPage/>}/>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
