import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { FaWpforms,FaCloudUploadAlt } from "react-icons/fa";
import { AiOutlineFileExcel } from "react-icons/ai";
const LeadBank = () => {
  return (
    <div className="relative lg:min-h-[89vh] sm:min-h-[75vh] rounded-lg items-start sm:justify-start lg:justify-center flex sm:flex-col lg:flex-row sm:gap-5 lg:gap-10 md:pt-0 lg:pt-0 sm:mt-5 lg:mt-10 ">
      <Link to="/leadbank/leadbankform" className="sm:w-full lg:w-80">
        <Card className="border border-blue-gray-100 shadow-sm sm:w-full lg:w-80 h-36">
          <CardHeader
            variant="gradient"
            floated={false}
            shadow={false}
            className="absolute grid h-12 w-12 place-items-center"
          >
            <FaWpforms size={40} color="red" />
          </CardHeader>
          <CardBody className="p-4 text-right">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-600"
            >
              Click to Register
            </Typography>
            <Typography variant="h4" color="blue-gray">
              Input Leads
            </Typography>
          </CardBody>

          <CardFooter className="border-t border-blue-gray-50 p-4">
            View Form
          </CardFooter>
        </Card>
      </Link>

      <Link to="/leadbank/viewdetailedleads" className="sm:w-full lg:w-80">
      <Card className="border border-blue-gray-100 shadow-sm sm:w-full lg:w-80 h-36">
        <CardHeader
          variant="gradient"
          floated={false}
          shadow={false}
          className="absolute grid h-12 w-12 place-items-center"
        >
          <AiOutlineFileExcel size={40} color="red" />
        </CardHeader>
        <CardBody className="p-4 text-right">
          <Typography
            variant="small"
            className="font-normal text-blue-gray-600"
          >
            View Details Here
          </Typography>
          <Typography variant="h4" color="blue-gray">
            View Leads
          </Typography>
        </CardBody>
        <CardFooter className="border-t border-blue-gray-50 p-4">
          Go to Details
        </CardFooter>
      </Card>
      </Link>

      <Link to="/leadbank/bulkupload" className="sm:w-full lg:w-80">
      <Card className="border border-blue-gray-100 shadow-sm sm:w-full lg:w-80 h-36">
        <CardHeader
          variant="gradient"
          floated={false}
          shadow={false}
          className="absolute grid h-12 w-12 place-items-center"
        >
          <FaCloudUploadAlt size={40} color="red" />
        </CardHeader>
        <CardBody className="p-4 text-right">
          <Typography
            variant="small"
            className="font-normal text-blue-gray-600"
          >
            Upload bulk excel
          </Typography>
          <Typography variant="h4" color="blue-gray">
            Bulk Upload
          </Typography>
        </CardBody>
        <CardFooter className="border-t border-blue-gray-50 p-4">
          Upload details
        </CardFooter>
      </Card>
      </Link>

    </div>
  );
};

export default LeadBank;
