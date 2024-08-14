import React, { useEffect, useState } from "react";
import axios from "axios";
import LeadDisplayTable from "./LeadDisplayTable";

const tableHeadings=["Name","Class","Div","Phone","Whatsapp","Syllabus","School","Location","District"]

const ViewDetailedLeads = () => {
  const [tHeadings,setTHeadings]=useState([...tableHeadings])
  const [leadList, setLeadList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(2);
  const [noPendingList, setNoPendingList] = useState(false);
  //function to fetch all leads
  const fetchLeadList = () => {
    axios
      .get(`/leadBank/getAllLeads?page=${currentPage}&limit=${itemsPerPage}`)
      .then((res) => {
        console.log("response is", res.data);
        setLeadList(res.data.leads);
        setNoPendingList(false);
      })
      .catch((err) => {
        console.log("error is", err.response.status);
        if (err.response.status === 404) {
          console.log("tudum..");
          setNoPendingList(true);
        }
      });
  };

  useEffect(() => {
    fetchLeadList();
  }, []);

  return (
    <>
      {noPendingList ? (
        <div className="w-full h-[85vh] flex justify-center items-center"><span className="text-2xl text-gray-600">No Leads Found!</span></div>
      ) : (
        <div>
          <LeadDisplayTable
            leadList={leadList}
            setLeadList={setLeadList}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            setTotalPages={setTotalPages}
            itemsPerPage={itemsPerPage}
            tHeadings={tHeadings}
            setTHeadings={setTHeadings}
          />
        </div>
      )}
    </>
  );
};

export default ViewDetailedLeads;
