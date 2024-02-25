import { Routes, Route, Outlet } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  
  DashboardNavbar,

  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController,  } from "@/context";
import Sidenav from "../components/features/sideBar/sidenav";
import Configurator from "../components/features/configurator/configurator";
import { setOpenConfigurator } from "../components/features/configurator/configuratorSlice";
import { useDispatch } from "react-redux";



export function Dashboard() {
  const dispatch=useDispatch()
  const [controller] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
    
      <Sidenav
        routes={routes}
        brandName="NEWTEN'S"
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator/>
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
          //<=.......type your content down here.......=>
        }
          <Outlet/>
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
