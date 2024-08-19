import React from "react";
import StatisticsCard from "../../../../widgets/cards/StatisticsCard";
import { Typography } from "@material-tailwind/react";
import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const TeamLeadStatisticsCard = () => {
  const TeamLeadStatisticsCardsData = [
    {
      color: "gray",
      icon: BanknotesIcon,
      title: "Today's Money",
      value: "$53k",
      footer: {
        color: "text-green-500",
        value: "+55%",
        label: "than last week",
      },
    },

    {
      color: "gray",
      icon: UserPlusIcon,
      title: "APPROVE USERS",
      value: "Pending list",
      path:"/pendingusers",
      footer: {
        color: "text-red-500",
        value: "7",
        label: "users waiting for Attention",
      },
    },
    {
      color: "gray",
      icon: ChartBarIcon,
      title: "Sales",
      value: "$103,430",
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "than yesterday",
      },
    },
    {
      color: "gray",
      icon: UsersIcon,
      title: "ALL STUDENTS",
      path:"/allStudents",
      value: "Details",
      footer: {
        color: "text-green-500",
        value: "+3%",
        label: "new students",
      },
    },
  ];
  return(
    <>
      {TeamLeadStatisticsCardsData.map(({ icon, title, path, footer, ...rest },index) => (
        <Link to={path} key={index}>
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        </Link>
      ))}
    </>
  )
};

export default TeamLeadStatisticsCard;
