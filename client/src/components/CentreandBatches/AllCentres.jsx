import React from 'react'
import { Button } from "@material-tailwind/react";


function AllCentres() {
  return (
    <div className="p-6 rounded-lg">
 <div className="flex items-center justify-between mb-6">
  <div className="relative">
    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5" />
    <input
      className="bg-white dark:bg-gray-800 pl-10 pr-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-700 dark:focus:ring-primary-500 dark:focus:border-primary-500"
      placeholder="Search Centre..."
      type="text"
    />
  </div>
</div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm transform transition-transform hover:scale-105">
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-2">MALA</h3>
    <p className="text-black mb-4">Charge: Joseph</p>
    <div className="flex items-center justify-between">
      <span className="text-black text-sm">Version 5.0.0</span>
      <Button size='sm' variant="outlined" className="rounded-full">
            Manage
          </Button>
        </div>
      </div>
    </div>

    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm transform transition-transform hover:scale-105">
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-2">ONLINE</h3>
    <p className="text-black mb-4">Charge: Joseph</p>
    <div className="flex items-center justify-between">
      <span className="text-black text-sm">Version 5.0.0</span>
      <Button size='sm' variant="outlined" className="rounded-full">
            Manage
          </Button>
        </div>
      </div>
    </div>

    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm transform transition-transform hover:scale-105">
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-2">PONNANI</h3>
    <p className="text-black mb-4">Charge: Joseph</p>
    <div className="flex items-center justify-between">
      <span className="text-black text-sm">Version 5.0.0</span>
      <Button size='sm' variant="outlined" className="rounded-full">
            Manage
          </Button>
        </div>
      </div>
    </div>

   
    </div>
  </div>

  )
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export default AllCentres