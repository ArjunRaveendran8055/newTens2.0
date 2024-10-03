import { Routes, Route } from "react-router-dom";
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
import RegForm from "../layouts/RegForm";
import AllCentres from "../components/CentreandBatches/AllCentres";
import ApproveStudents from "../components/ApproveStudents/ApproveStudents";
import Batches from "../components/CentreandBatches/Batches";
import DisplayBatches from "../components/CentreandBatches/DisplayBatches";
import SubmitSuccess from "../layouts/SubmitSuccess";
import LeadBankForm from "../components/Marketing/LeadBankForm";
import LeadBank from "../components/Marketing/LeadBank";
import ViewDetailedLeads from "../components/Marketing/ViewDetailedLeads";
import BulkUpload from "../components/Marketing/BulkUpload";
import { SERVER_URL } from "../server";
import AllStudentsView from "../components/studentComponents/allStudentsView/AllStudentsView";
import ManageStaffs from "../components/staffComponents/ManageStaffs";
import Attendance from "../components/classComponents/Attendance";
import AllottedStudents from "../components/AllottedStudents/AllottedStudents"

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
        <Route
          path="/SubmitSuccess/:resid"
          element={<SubmitSuccess></SubmitSuccess>}
        />
        <Route
          path="/SubmitSuccess/:resid"
          element={<SubmitSuccess></SubmitSuccess>}
        />

        <Route path="" element={<Dashboard />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/tables" element={<Table />} />
          <Route path="/search" element={<SearchPage />} />
          {/* <Route path="/accessdenied" element={<AccessDenied/>} /> */}
          <Route
            path="/search/studentdetails/:id"
            element={<StudentDetailsPage />}
          />
          <Route
            path="/search/studentdetails/:id"
            element={<StudentDetailsPage />}
          />
          {/* classes components inside here */}
          <Route path="/classes" element={<DisplayClasses />} />
          <Route path="/classes/classhome/:id" element={<ClassHome />} />
          <Route path="/classes/classreport/:id" element={<ClassReport />} />
          <Route path="/clases/attendance/:id" element={<Attendance />} />
          <Route path="/approvestudents" element={<ApproveStudents />} />
          <Route path="/allStudents" element={<AllStudentsView />} />
          <Route path="/classes/classhome/:id" element={<ClassHome />} />
          <Route path="/classes/classreport/:id" element={<ClassReport />} />
          <Route path="/clases/attendance/:id" element={<Attendance />} />
          <Route path="/approvestudents" element={<ApproveStudents />} />
          <Route path="/allStudents" element={<AllStudentsView />} />
          {/* components inside allcentres */}
          <Route path="/allcentres" element={<AllCentres />} />
          <Route path="/allcentres/batches/:id" element={<Batches />} />
          <Route
            path="/allcentres/displaybatches/:id"
            element={<DisplayBatches />}
          />
          <Route path="/allcentres" element={<AllCentres />} />
          <Route path="/allcentres/batches/:id" element={<Batches />} />
          <Route
            path="/allcentres/displaybatches/:id"
            element={<DisplayBatches />}
          />
          {/* private route example */}
          
          <Route path="/leadbank" element={<LeadBank />} />
          <Route path="/leadbank/leadbankform" element={<LeadBankForm />} />
          <Route
            path="/leadbank/viewdetailedleads"
            element={<ViewDetailedLeads />}
          />
          <Route path="/leadbank/bulkupload" element={<BulkUpload />} />
          <Route
            path="/addstudent"
            element={
              <PrivateRoute
                userType={["AA", "admin"]}
                comp={<AddStudent />}
              ></PrivateRoute>
            }
          />
          
          <Route path="/leadbank" element={<LeadBank />} />
          <Route path="/leadbank/leadbankform" element={<LeadBankForm />} />
          <Route
            path="/leadbank/viewdetailedleads"
            element={<ViewDetailedLeads />}
          />
          <Route path="/leadbank/bulkupload" element={<BulkUpload />} />
          <Route
            path="/addstudent"
            element={
              <PrivateRoute
                userType={["AA", "admin"]}
                comp={<AddStudent />}
              ></PrivateRoute>
            }
          />
          {/* staff components */}
          <Route path="/managestaffs" element={<ManageStaffs />} />
          <Route path="/managestaffs" element={<ManageStaffs />} />
          <Route path="/pendingusers" element={<PendingUsers />} />
          {/* allotted students */}
          <Route path="/allottedstudents" element={<AllottedStudents></AllottedStudents>}/>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
