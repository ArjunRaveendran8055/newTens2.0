import React from "react";

function SkeletonTable() {
  const tableHeadings = ["Name", "Class", "Year", "Division", "Phone", "WhatsApp", "Syllabus", "School", "Location", "District"];

  return (
    <table className="w-full min-w-[640px] table-auto animate-pulse">
      <thead>
        <tr>
          {tableHeadings.map((el, key) => (
            <th
              key={key}
              className="border-b border-blue-gray-50 py-3 px-5 text-left"
            >
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 5 }).map((_, rowKey) => (
          <tr key={rowKey} className="capitalize">
            {Array.from({ length: tableHeadings.length }).map((_, colKey) => (
              <td
                key={colKey}
                className={`py-3 px-5 ${
                  rowKey === 4 ? "" : "border-b border-blue-gray-50"
                }`}
              >
                <div className="h-4 bg-gray-300 rounded w-full"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SkeletonTable;