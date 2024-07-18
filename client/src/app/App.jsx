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

import Home from "../pages/dashboard/Home";
import StudentDetailsPage from "../pages/otherPages/StudentDetailsPage";
import DisplayClasses from "../components/displayClasses/DisplayClasses";
import ClassHome from "../components/classComponents/ClassHome";
import ClassReport from "../components/classComponents/ClassReport";
import AddStudent from "../components/AddStudent/AddStudent";
import PrivateRoute from "./PrivateRoute";
import AccessDenied from "./AccessDenied";
import RegForm from "../layouts/RegForm";
import AllCentres from "../components/CentreandBatches/AllCentres";
import ApproveStudents from "../components/ApproveStudents/ApproveStudents";
import Batches from "../components/CentreandBatches/Batches";
import DisplayBatches from "../components/CentreandBatches/DisplayBatches";
import Asignaa from "../components/classComponents/Asignaa";
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
        
        <Route path="/regForm" element={<RegForm></RegForm>} />

        <Route path="" element={<Dashboard />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/tables" element={<Table />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/pendingusers" element={<PendingUsers />} />
          <Route path="/classes" element={<DisplayClasses />} />
          {/* <Route path="/accessdenied" element={<AccessDenied/>} /> */}
          <Route path="/studentdetails/:id" element={<StudentDetailsPage/>}/>
          <Route path="/classhome/:id" element={<ClassHome/>}/>
          <Route path="/classreport/:id" element={<ClassReport/>}/>
          <Route path="/allcentres" element={<AllCentres/>} />
          <Route path="/approvestudents" element={<ApproveStudents/>} />
          <Route path="/batches" element={<Batches/>} />
          <Route path="/displaybatches" element={<DisplayBatches/>} />
          {/* private route example */}
          <Route path="/assignaa" element={<Asignaa/>}/>
          <Route path="/addstudent" element={ <PrivateRoute userType={["AA","admin"]} comp={<AddStudent/>}></PrivateRoute>}/>
        </Route>
      </Routes>
    </div>
  );
}




export default App;
