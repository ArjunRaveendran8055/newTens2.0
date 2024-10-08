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
    title: "CRM Controls",
    layout: "crm",
    pages: [
      {
        icon: <BsClipboardData {...icon} />,
        name: "General Leads",
        path: "/leadbank/viewdetailedleads",
      },
      {
        icon: <GrTableAdd {...icon} />,
        name: "Bulk Upload",
        path: "/leadbank/bulkupload",
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
    title: "Staff Panel",
    layout: "user",
    pages: [
      {
        icon: <IoSearch {...icon} />,
        name: "Manage Users",
        path: "/managestaffs",
      },
      {
        icon: <TbReportSearch {...icon} />,
        name: "Pending Users",
        path: "/pendingusers",
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
        icon: <ServerStackIcon {...icon} />,
        name: "Approve Students",
        path: "/approvestudents",
      },

      {
        icon: <MdClass {...icon} />,
        name: "Class List",
        path: "/classes",
      },
      {
        icon: <MdClass {...icon} />,
        name: "Add Student",
        path: "/addstudent",
      },
    ],
  },
];


export const TAroutes = [
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
        icon: <MdClass {...icon} />,
        name: "Class List",
        path: "/classes",
      },
    ],
  },
];


export const MENTORroutes = [
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
        path: "/classes",
      },
      {
        icon: <MdClass {...icon} />,
        name: "Add Student",
        path: "/addstudent",
      },
    ],
  },
];

export const TEAMLEADroutes = [
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
    title: "CENTRE MANAGEMENT",
    layout: "CENTRE",
    pages: [
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "list Centres",
        path: "/allcentres",
      },
    ],
  },
  {
    title: "STAFF MANAGEMENT",
    layout: "STAFF",
    pages: [
      {
        icon: <TbReportSearch {...icon} />,
        name: "Pending Staff lists",
        path: "/pendingusers",
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
        path: "/classes",
      },
      {
        icon: <MdClass {...icon} />,
        name: "Add Student",
        path: "/addstudent",
      },
    ],
  }
  
];

export const MARKETINGroutes = [
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
    title: "MARKETING MANAGEMENT",
    layout: "class",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "Lead Bank",
        path: "/leadbank",
      },
    ],
  },
];
