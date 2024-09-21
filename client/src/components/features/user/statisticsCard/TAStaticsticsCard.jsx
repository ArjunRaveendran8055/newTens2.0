import React, { useEffect, useState } from "react";
import StatisticsCard from "../../../../widgets/cards/StatisticsCard";
import { Typography } from "@material-tailwind/react";
import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import axios from "axios";

function TAStatisticsCard() {
  const [PendingUserList,setPendingUserList] = useState([])

  useEffect(()=>{
    axios.get("/user/getPendingUserList")
    .then((res)=>{
      setPendingUserList(res.data)
    })
    .catch((err)=>console.log(err.message))
  },[])



  console.log("pending users:", PendingUserList);
  const adminStatisticsCardsData = [
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
      path:"/pendingusers",
      value: "Pending list",
      footer: {
        color: "text-red-500",
        value: PendingUserList.count,
        label:
          PendingUserList?.count == 1
            ? "user waiting for Attention"
            : "users waiting for Attention",
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
      {adminStatisticsCardsData.map(({ icon, title, path, footer, ...rest },index) => (
        <Link key={index} to={path}>
        
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
  );
}

export default TAStatisticsCard;
