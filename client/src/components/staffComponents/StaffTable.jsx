import React from 'react';

const AuthorsTable = ({ authors }) => {
  return (
    <div className="container mx-auto pt-9">
      <div className="bg-gray-800 text-white p-4 rounded-t-lg">
        <h2 className="text-lg font-semibold">STAFF DETAILS</h2>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-b-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Designition</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">DOB</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {authors.map((author, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={author.image} alt={author.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-s font-medium text-gray-900">{author.name}</div>
                      <div className="text-sm text-black">Email: {author.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-s text-gray-900">{author.function.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      author.status === 'Online'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-gray-800'
                    }`}
                  >
                    {author.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{author.employed}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-3 mt-2">
                 <a href="#" className="text-indigo-600 hover:text-indigo-900">Delete</a>
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuthorsTable;