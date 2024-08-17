import React from 'react';

function SkeletonStudent() {
  return (
    <li className="col-span-1 sm:w-full mt-6 divide-y divide-gray-500 rounded-lg bg-white shadow-lg animate-pulse">
      <div className="flex w-full items-center justify-between space-x-6 sm:p-12 lg:p-10">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
          <div className="mt-2 flex gap-2 w-full px-2 justify-between">
            <div className="h-4 bg-gray-300 rounded w-2/4"></div>
          </div>
        </div>
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
      </div>
      <div className="-mt-px flex divide-x divide-gray-200">
        <div className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center py-4">
          <div className="h-5 w-24 bg-gray-300 rounded-full"></div>
        </div>
        <div className="relative inline-flex w-0 flex-1 items-center justify-center py-4">
          <div className="h-5 w-24 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </li>
  );
}

export default SkeletonStudent;
