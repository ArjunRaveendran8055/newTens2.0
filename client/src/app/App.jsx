import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../layouts/Dashboard";
import { Home } from "../pages/dashboard";
import Profile from "../pages/dashboard/profile";
import Notifications from "../pages/dashboard/Notifications";
import Table from "../pages/dashboard/Table";
import SignUp from "../pages/auth/SignUp";
import ToastContainer from "../components/features/toast/ToastContainer";

import axios from "axios"
import ActivationPage from "../pages/auth/ActivationPage";
import Login from "../pages/auth/Login";

function App() {

  axios.defaults.baseURL="http://localhost:8055";
  axios.defaults.withCredentials=true

  return (
    <div className="relative">
      <ToastContainer/>
      <Routes>
      <Route path="/signUp" element={<SignUp/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="/activation/:activationToken" element={<ActivationPage/>}/>
      <Route path="" element={<Dashboard/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/notifications" element={<Notifications/>}/>
        <Route path="/tables" element={<Table/>} />
      </Route> 
    </Routes>
    </div>
  );
}

export default App;
