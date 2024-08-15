import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
} from "@material-tailwind/react";
import { CiExport } from "react-icons/ci";
import authorsTableData from "../../data/authorsTableData";
import CheckBox from "@mui/icons-material/CheckBox";

const LeadDisplayTable = ({
  leadList,
  setLeadList,
  currentPage,
  setCurrentPage,
  totalPages,
  setTotalPages,
  itemsPerPage,
  tHeadings,
  setTHeadings,
}) => {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader className="mb-2 p-2 shadow-lg">
          <Typography color="white" className="w-full flex flex-col">
            <div className="LeadDetailsandExportDiv w-full flex justify-between items-center">
              <span className="text-3xl text-gray-600 font-extrabold">
                Lead Details
              </span>
              <Button className="flex gap-2 justify-center items-center bg-black">
                <span>Export</span> <CiExport size={25} />
              </Button>
            </div>
            <div className="checkSelectionDiv text-gray-500">
              <CheckBox color="red" className="text-red">Dragon</CheckBox>
            </div>
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {tHeadings.map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leadList.map((item, key) => {
                const className = `py-3 px-5 ${
                  key === leadList.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={key} className="uppercase">
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {item.name}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {item.class}
                      </Typography>
                    </td>
                    <td className={className}>{item.division}</td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {item.phone}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {item.whatsapp}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {item.syllabus}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {item.school}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {item.location}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {item.district}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

export default LeadDisplayTable;
