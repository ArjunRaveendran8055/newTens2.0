import { Routes, Route, Outlet } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import { DashboardNavbar, Footer } from "@/widgets/layout";
import routes from "@/routes";

import Sidenav from "../components/features/sideBar/sidenav";
import Configurator from "../components/features/configurator/configurator";
import { setOpenConfigurator } from "../components/features/configurator/configuratorSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

export function Dashboard() {
  let flag = false;

  //Api to verify user using cookie
  const verifyUser = () => {
    axios
      .get("/auth/verifyUser")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //api to genarate refreshToken
  const refreshToken = () => {
    axios
      .get("/auth/refreshToken")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  useEffect(() => {
    if (!flag) {
      flag = true;
      verifyUser();
    }
    const interval = setInterval(() => {
      refreshToken();
    }, 3 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandName="NEWTEN'S"
        brandImg={"/img/logo-ct.png"}
      />
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
        <div className="text-blue-gray-600">
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
