import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/dashboard/Profile";
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
import SubmitSuccess from "../layouts/SubmitSuccess";
import LeadBankForm from "../components/Marketing/LeadBankForm";
import LeadBank from "../components/Marketing/LeadBank";
import LeadDisplayTable from "../components/Marketing/LeadDisplayTable";
import ViewDetailedLeads from "../components/Marketing/ViewDetailedLeads";
import BulkUpload from "../components/Marketing/BulkUpload";
import { SERVER_URL } from "../server";
import SkeletonStudentSearch from "../widgets/skeletonLoading/SkeletonStudentSearch";
import Skeleton from "../widgets/skeletonLoading/Skeleton";

function App() {
  axios.defaults.baseURL = SERVER_URL;
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
        <Route path="/SubmitSuccess/:resid" element={<SubmitSuccess></SubmitSuccess>} />

        <Route path="" element={<Dashboard />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/tables" element={<Table />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/pendingusers" element={<PendingUsers />} />
          {/* <Route path="/accessdenied" element={<AccessDenied/>} /> */}
          <Route path="/search/studentdetails/:id" element={<StudentDetailsPage/>}/>
          {/* classes components inside here */}
          <Route path="/classes" element={<DisplayClasses />} />
          <Route path="/classes/classhome/:id" element={<ClassHome/>}/>
          <Route path="/classes/classreport/:id" element={<ClassReport/>}/>
          <Route path="/approvestudents" element={<ApproveStudents/>} />
          {/* components inside allcentres */}
          <Route path="/allcentres" element={<AllCentres/>} />
          <Route path="/allcentres/batches/:id" element={<Batches/>} />
          <Route path="/allcentres/displaybatches/:id" element={<DisplayBatches/>} />
          {/* private route example */}
          <Route path="/assignaa" element={<Asignaa/>}/>
          <Route path="/leadbank" element={<LeadBank/>}/>
          <Route path="/leadbank/leadbankform" element={<LeadBankForm/>}/>
          <Route path="/leadbank/viewdetailedleads" element={<ViewDetailedLeads/>}/>
          <Route path="/leadbank/bulkupload" element={<BulkUpload/>}/>
          
          <Route path="/addstudent" element={ <PrivateRoute userType={["AA","admin"]} comp={<AddStudent/>}></PrivateRoute>}/>
        </Route>
      </Routes>
    </div>
  );
}




export default App;
