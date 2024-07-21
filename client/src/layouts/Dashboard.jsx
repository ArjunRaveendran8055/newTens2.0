import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import Sidenav from "../components/features/sideBar/SideNav";
import Configurator from "../components/features/configurator/configurator";
import { setOpenConfigurator } from "../components/features/configurator/configuratorSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import DashboardNavbar from "../widgets/layout/DashboardNavbar";
import Footer from "../widgets/layout/footer";
import { routes } from "../routes";
import { setToastView } from "../components/features/toast/toastSlice";
import { setUser } from "../components/features/user/userSlice";

export function Dashboard() {
  const { user } = useSelector((state) => state.user);
  let flag = false;
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Api to verify user using cookie
  const verifyUser = () => {
    axios
      .get("/auth/verifyUser")
      .then((res) => {
        const { data } = res.data;
        //console.log("user is", data);
        return dispatch(setUser(data));
      })
      .catch((err) => {
        const { error } = err.response.data;
        //console.log(error);
        dispatch(setToastView({ type: "error", msg: error }));
        return navigate("/");
      });
  };
  //api to genarate refreshToken
  const refreshToken = () => {
    axios
      .get("/auth/refreshToken")
      .then((res) => {
        const { data } = res.data;
        return dispatch(setUser(data));
      })
      .catch((err) => {
        const { error } = err.response.data;
        //console.log(error);
        dispatch(setToastView({ type: "error", msg: error }));
        return navigate("/");
      });
  };

  useEffect(() => {
    if (!flag) {
      flag = true;
      verifyUser();
    }
    const interval = setInterval(() => {
      refreshToken();
    }, 30 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.clear();
    };
  
    window.addEventListener('unload', clearLocalStorage);
  
    return () => {
      window.removeEventListener('unload', clearLocalStorage);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav brandName="NEW10'S" brandImg={""} />

      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => dispatch(setOpenConfigurator())}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <div className="text-blue-gray-600 relative">
          {
            //<=.......put your Outlet Component down here.......=>
          }
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
