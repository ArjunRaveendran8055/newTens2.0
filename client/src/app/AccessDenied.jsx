import React from 'react'

function AccessDenied() {
  return (
    <div className="flex h-screen justify-center items-center bg-gray-200">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-lg text-gray-800">You do not have permission to access this page.</p>
    </div>
  </div>
  )
}

export default AccessDenied