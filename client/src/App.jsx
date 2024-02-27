import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./layouts/Dashboard";
import { Home } from "./pages/dashboard";
import Profile from "./pages/dashboard/profile";
import Notifications from "./pages/dashboard/Notifications";
import Table from "./pages/dashboard/Table";
import SignUp from "./pages/auth/SignUp";
import ToastContainer from "./components/features/toast/ToastContainer";



function App() {
  return (
    <div className="relative">
      <ToastContainer/>
      <Routes>
      <Route path="/signUp" element={<SignUp/>}/>
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
