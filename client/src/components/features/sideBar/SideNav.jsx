import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";

import { useDispatch, useSelector } from "react-redux";
import { routes, AAroutes, TEAMLEADroutes } from "../../../routes";
import Logo from "./logo.png";

export function Sidenav({ brandName }) {
  const { isOpen } = useSelector((state) => state.sideNav);
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <aside
        className={`hidden xl:block translate-x-0
       fixed inset-0 z-44 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100 bg-white`}
      >
        <div className={`relative`}>
          <div className="py-6 mt-2 px-8 text-center flex flex-row justify-center items-center gap-2">
            <img width={"50px"} src={Logo} alt=""  />
            <Typography variant="h4" color="black">
              {brandName}
            </Typography>
          </div>
          <IconButton
            variant="text"
            color="white"
            size="sm"
            ripple={false}
            className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
            onClick={() => setOpenSidenav(dispatch, false)}
          >
            <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
          </IconButton>
        </div>
        <div className="m-4">
          {user.role === "admin" &&
            routes.map(({ layout, title, pages }, key) => (
              <ul key={key} className="mb-4 flex flex-col gap-1">
                {
                  //MODULE TITLE
                }

                {title && (
                  <li className="mx-3.5 mt-4 mb-2">
                    <Typography
                      variant="small"
                      color="inherit"
                      className="font-black uppercase opacity-75"
                    >
                      {title}
                    </Typography>
                  </li>
                )}

                {pages.map(({ icon, name, path }) => (
                  <li key={name}>
                    <NavLink to={`${path}`}>
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "gradient" : "text"}
                          color="black"
                          className="flex items-center gap-4 px-4 capitalize"
                          fullWidth
                        >
                          {icon}
                          <Typography
                            color="inherit"
                            className="font-medium capitalize"
                          >
                            {name}
                          </Typography>
                        </Button>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ))}

          {user.role === "AA" &&
            AAroutes.map(({ layout, title, pages }, key) => (
              <ul key={key} className="mb-4 flex flex-col gap-1">
                {
                  //MODULE TITLE
                }

                {title && (
                  <li className="mx-3.5 mt-4 mb-2">
                    <Typography
                      variant="small"
                      color="inherit"
                      className="font-black uppercase opacity-75"
                    >
                      {title}
                    </Typography>
                  </li>
                )}

                {pages.map(({ icon, name, path }) => (
                  <li key={name}>
                    <NavLink to={`${path}`}>
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "gradient" : "text"}
                          color="black"
                          className="flex items-center gap-4 px-4 capitalize"
                          fullWidth
                        >
                          {icon}
                          <Typography
                            color="inherit"
                            className="font-medium capitalize"
                          >
                            {name}
                          </Typography>
                        </Button>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ))}

          {user.role === "TEAMLEAD" &&
            TEAMLEADroutes.map(({ layout, title, pages }, key) => (
              <ul key={key} className="mb-4 flex flex-col gap-1">
                {
                  //MODULE TITLE
                }

                {title && (
                  <li className="mx-3.5 mt-4 mb-2">
                    <Typography
                      variant="small"
                      color="inherit"
                      className="font-black uppercase opacity-75"
                    >
                      {title}
                    </Typography>
                  </li>
                )}

                {pages.map(({ icon, name, path }) => (
                  <li key={name}>
                    <NavLink to={`${path}`}>
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "gradient" : "text"}
                          color="black"
                          className="flex items-center gap-4 px-4 capitalize"
                          fullWidth
                        >
                          {icon}
                          <Typography
                            color="inherit"
                            className="font-medium capitalize"
                          >
                            {name}
                          </Typography>
                        </Button>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ))}
        </div>
      </aside>

      {
        //for mobile screen
      }

      <aside
        className={` sm:block xl:hidden ${
          !isOpen ? "-translate-x-80" : "translate-x-0"
        }
       fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100 bg-white`}
      >
        <div className={`relative`}>
          <div className="py-6 px-8 text-center">
            <Typography variant="h6" color="black">
              {brandName}
            </Typography>
          </div>
          <IconButton
            variant="text"
            color="white"
            size="sm"
            ripple={false}
            className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
            onClick={() => setOpenSidenav(dispatch, false)}
          >
            <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
          </IconButton>
        </div>
        <div className="m-4">
          {user.role === "admin" &&
            routes.map(({ layout, title, pages }, key) => (
              <ul key={key} className="mb-4 flex flex-col gap-1">
                {
                  //MODULE TITLE
                }

                {title && (
                  <li className="mx-3.5 mt-4 mb-2">
                    <Typography
                      variant="small"
                      color="inherit"
                      className="font-black uppercase opacity-75"
                    >
                      {title}
                    </Typography>
                  </li>
                )}

                {pages.map(({ icon, name, path }) => (
                  <li key={name}>
                    <NavLink to={`${path}`}>
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "gradient" : "text"}
                          color="green"
                          className="flex items-center gap-4 px-4 capitalize"
                          fullWidth
                        >
                          {icon}
                          <Typography
                            color="inherit"
                            className="font-medium capitalize"
                          >
                            {name}
                          </Typography>
                        </Button>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ))}

          {user.role === "TEAMLEAD" &&
            TEAMLEADroutes.map(({ layout, title, pages }, key) => (
              <ul key={key} className="mb-4 flex flex-col gap-1">
                {
                  //MODULE TITLE
                }

                {title && (
                  <li className="mx-3.5 mt-4 mb-2">
                    <Typography
                      variant="small"
                      color="inherit"
                      className="font-black uppercase opacity-75"
                    >
                      {title}
                    </Typography>
                  </li>
                )}

                {pages.map(({ icon, name, path }) => (
                  <li key={name}>
                    <NavLink to={`${path}`}>
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "gradient" : "text"}
                          color="green"
                          className="flex items-center gap-4 px-4 capitalize"
                          fullWidth
                        >
                          {icon}
                          <Typography
                            color="inherit"
                            className="font-medium capitalize"
                          >
                            {name}
                          </Typography>
                        </Button>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ))}
        </div>
      </aside>
    </>
  );
}

export default Sidenav;
