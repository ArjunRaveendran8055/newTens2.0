import React from "react";
import { useSelector } from "react-redux";

function PendingUsers() {
  const { PendingUserList } = useSelector((state) => state.user);

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

                  {PendingUserList?.map((user, index) => {
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
                                {user.firstname}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {user.email}
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
                            <select className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                              <option>Choose a Designition</option>
                              <option>TA</option>
                              <option>S-TA</option>
                              <option>AA</option>
                              <option>CC</option>
                            </select>
                          </div>
                        </td>
                        {/* DROPDOWN ENDS HERE */}
                        <td className="px-5 py-5 bg-white text-sm">
                          {/* reject button */}
                          <button className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110">
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
                          <button className="inline-flex items-center px-4 py-2 bg-green-600 transition ease-in-out delay-75 hover:bg-green-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110">
                            Approve
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

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
