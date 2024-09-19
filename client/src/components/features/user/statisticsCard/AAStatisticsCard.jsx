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
const AAStatisticsCard = () => {
  const AAStatisticsCardsData = [
    {
      color: "gray",
      icon: BanknotesIcon,
      title: "Today's Money",
      value: "Allotted Classes",
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
      footer: {
        color: "text-red-500",
        value: "7",
        label: "users waiting for Attention",
      },
    },
    {
      color: "gray",
      path:"/approvestudents",
      icon: ChartBarIcon,
      title: "APPROVE STUDENTS",
      value: "SUBMITTED FORMS",
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "than yesterday",
      },
    },
    {
      color: "gray",
      icon: UsersIcon,
      title: "STUDENTS",
      value: "CRM",
      footer: {
        color: "text-green-500",
        value: "+3%",
        label: "usage than last month",
      },
    },
  ];

  return (
    <>
      {AAStatisticsCardsData.map(({ icon, title, path, footer, ...rest },key) => (
        <Link to={path} key={key}>
          <StatisticsCard
            
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
  );
};

export default AAStatisticsCard;
