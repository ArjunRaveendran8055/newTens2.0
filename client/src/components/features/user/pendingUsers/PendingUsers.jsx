import axios from "axios";
import React, { useEffect, useState } from "react";
import { setToastView } from "../../toast/toastSlice";
import { useDispatch } from "react-redux";
import { Alert } from "@material-tailwind/react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PendingUsers() {
    // state to show message after submitting report
    const[saveMessage,setSaveMessage]=useState("")

  // PENDING USER LIST FETCHED
  const [PendingUserList,setPendingUserList] = useState([]) 

  // STATE USED FOR STORE DESIGNITION VALUE FROM DROPDOWN
  const [selectedValue, setSelectedValue] = useState([]);

  const dispatch = useDispatch();

  useEffect(()=>{
   pendingCall()
  },[])

  // TAKING PENDING USER LIST FROM SERVER
  const pendingCall=()=>{
    axios.get("/user/getPendingUserList")
    .then((res)=>{
      setPendingUserList(res.data)
    })
    .catch((err)=>console.log(err.message))
  }

  // DELETE PENDING USER FROM LIST
  const deleteUser = (userID) => {
    axios.delete(`/user/deleteUser/${userID}`)
      .then((res) => {
        //  dispatch(setToastView({ type: "success", msg: res.data.message }));
        pendingCall()
      })
      .catch((err) => {
        console.error(`Error deleting user with ID ${userID}:`, err);
      });
  };

  // SELECT STORE FUNCTION
const handleSelectChange = (event,id) => {
  
    let flag=false;

     const result =  selectedValue.map((data)=>{
        
      if(data.id==id) {
        data.role=event.target.value;
        flag=true;
      }

      return data
       })

if(flag){

  setSelectedValue(result);

}else{

   setSelectedValue([...selectedValue,{
      id,
      role:event.target.value,
    }]);
}

  };

  
  const findObjectById = (id) => {
    return selectedValue.find(item => item.id === id);
  };

  // APPROVE PENDING USER FUNCTION
  const onApproveHandler = (userID) => {
    const userData = findObjectById(userID);
    console.log(userData);
  
    if (userData !== undefined && userData.role !== '') {
      axios.put(`/user/approveUser/${userID}`, { role: userData.role })
        .then((res) => {
          console.log(res);
          setSaveMessage("User Approved successfully!");
          pendingCall()
        })
        .catch((err) => {
          console.log(err);
        });
  
    } else {
      dispatch(setToastView({ type: "error", msg: "Choose Designation" }));
    }
    setTimeout(() => {
      setSaveMessage("");
    }, 1000);
  }

  return (
   
    <div className="bg-white p-8 rounded-md w-full min-h-[90vh] mt-10">
      <div className=" flex items-center justify-between pb-6">
        <div>
          <h2 className="text-gray-800 font-semibold">Approval list</h2>
        </div>
        <div className="flex items-center justify-between"></div>
      </div> 
      {PendingUserList?.length !== 0 ? (
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Designation
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody>
                  {/* loop from here */}

                  {PendingUserList.data?.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td className="px-5 py-5 bg-white text-sm">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img
                                className="w-full h-full rounded-full"
                                src="https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80"
                                alt=""
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {user?.firstname}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {user?.email}
                          </p>
                        </td>
                        <td className="px-5 py-5 bg-white text-sm">
                          {/* DROP DOWN FOR DESIGNITION STARTS HERE */}
                          <div className="relative inline-flex">
                            <svg
                              className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 412 232"
                            >
                              <path
                                d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                                fill="#648299"
                                fillRule="nonzero"
                              />
                            </svg>
                            <select onChange={(e)=>handleSelectChange(e,user._id)} className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                              <option value=''>Choose a Designition</option>
                              <option value="TA">TA</option>
                              <option value="S-TA">S-TA</option>
                              <option value="AA">AA</option>
                              <option value="CC">CC</option>
                              <option value="MENTOR">MENTOR</option>
                            </select>
                          </div>
                        </td>
                        {/* DROPDOWN ENDS HERE */}
                        <td className="px-5 py-5 bg-white text-sm">
                          {/* reject button */}
                          <button onClick={()=>{deleteUser(user._id)}} className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110">
                            <svg
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              fill="none"
                              className="h-5 w-5 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                strokeWidth={2}
                                strokeLinejoin="round"
                                strokeLinecap="round"
                              />
                            </svg>
                            Reject
                          </button>
                          {/* reject button ends here */}
                        </td>
                        <td className="px-5 py-5 bg-white text-sm">
                          {/* approve button */}
                          <button onClick={()=>onApproveHandler(user._id)} className="inline-flex items-center px-4 py-2 bg-green-600 transition ease-in-out delay-75 hover:bg-green-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110">
                            Approve
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {saveMessage &&
              <Alert
      icon={<Icon />}
      className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]"
    >
      {saveMessage}
    </Alert>
}
              {/* loop ends here */}

              {/* pagination hidden */}
              {/* <div
						class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
						<span class="text-xs xs:text-sm text-gray-900">
                      Showing 1 to 4 of 50 Entries
                  </span>
						<div class="inline-flex mt-2 xs:mt-0">
							<button
                          class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                          Prev
                      </button>
							&nbsp; &nbsp;
							<button
                          class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                          Next
                      </button>
						</div>
					</div> */}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="sm:text-xl lg:text-3xl pt-10 font-Playfiar">
            Users Pending List Found Null.
          </p>
        </div>
      )}
    </div>
  );
}

export default PendingUsers;
