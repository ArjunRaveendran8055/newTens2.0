import axios from "axios"
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";

import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "../../components/features/sideBar/sideNavSlice";
import { setOpenConfigurator } from "../../components/features/configurator/configuratorSlice";
import { Link, useNavigate } from "react-router-dom";

export function DashboardNavbar() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
const navigate=useNavigate()

  const logOutHandler=()=>{
    axios.get("/auth/logout")
    .then((res)=>{
      console.log(res.data);
      navigate("/")
    })
    .catch((err)=>{
      console.log(err);
      navigate("/")
    })
  }

  return (
    <Navbar
      color="white"
      className={`rounded-xl transition-all  top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5`}
      fullWidth
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="uppercase font-bold text-black sm:text-sm md:text-md lg:text-2xl">
          {user.firstname}
          {user.lastname}&nbsp;-&nbsp;{user.role}
        </div>
        <div className="flex items-between ">
          <div className="search-bar mr-auto md:mr-4 md:w-56">
            <Input label="Search" />
          </div>
          <Link >
            <Button
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-4 xl:flex normal-case"
              onClick={logOutHandler}
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              Log Out
            </Button>
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton>
          </Link>
          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-3">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New message</strong> from Laur
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New album</strong> by Travis Scott
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                  <CreditCardIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    Payment successfully completed
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>

          {/* configarator icon in dashboardNav is hidden due to lack of space in moblie screen */}

          {/* <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => dispatch(setOpenConfigurator())}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton> */}

          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => {
              dispatch(setIsOpen());
            }}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

export default DashboardNavbar;
