import React, { useEffect, useState } from "react";
import axios from "axios";
import LeadDisplayTable from "./LeadDisplayTable";

const ViewDetailedLeads = () => {
  const [leadList, setLeadList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [noPendingList, setNoPendingList] = useState(false);
  //function to fetch all leads

  return (
    <div>
      <LeadDisplayTable
        leadList={leadList}
        setLeadList={setLeadList}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        noPendingList={noPendingList}
        setNoPendingList={setNoPendingList}
      />
    </div>
  );
};

export default ViewDetailedLeads;
