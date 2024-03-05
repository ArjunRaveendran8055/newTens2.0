import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { BsClipboardData } from "react-icons/bs";
import { GrTableAdd } from "react-icons/gr";
import { TbReportSearch } from "react-icons/tb";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { MdClass } from "react-icons/md";
const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "my profile",
        path: "/profile",
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
      },
    ],
  },
  {
    title: "CRM Controlls",
    layout: "crm",
    pages: [
      {
        icon: <BsClipboardData {...icon} />,
        name: "General Leads",
        path: "/pro",
      },
      {
        icon: <GrTableAdd {...icon} />,
        name: "Bulk Upload",
        path: "/pro",
      },
      {
        icon: <MdOutlineAssignmentInd {...icon} />,
        name: "Assign Leads",
        path: "/pro",
      },
      {
        icon: <TbReportSearch {...icon} />,
        name: "Reports",
        path: "/pro",
      },
    ],
  },
  {
    title: "User Controlls",
    layout: "user",
    pages: [
      {
        icon: <IoSearch {...icon} />,
        name: "Search User",
        path: "/pro",
      },
      {
        icon: <TbReportSearch {...icon} />,
        name: "Reports",
        path: "/pro",
      },
    ],
  },
];

export const AAroutes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
      },
    ],
  },
  {
    title: "CLASS MANAGEMENT",
    layout: "class",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "Search Students",
        path: "/search",
      },
      {
        icon: <MdClass {...icon} />,
        name: "Class List",
        path: "/",
      },
      {
        icon: <MdClass {...icon} />,
        name: "Add Student",
        path: "/",
      },
    ],
  },
];
