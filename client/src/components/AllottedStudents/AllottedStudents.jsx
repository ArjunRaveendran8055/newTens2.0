import React, { useState , useEffect } from 'react';
import axios from 'axios';










// Dummy data
const centers = [
  {
    id: 1,
    name: "Center 1",
    classes: [
      {
        id: 1,
        name: "Class 10",
        batches: [
          { id: 1, name: "Batch A" },
          { id: 2, name: "Batch B" }
        ]
      },
      {
        id: 2,
        name: "Class 9",
        batches: [
          { id: 3, name: "Batch A" },
          { id: 4, name: "Batch B" }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Center 2",
    classes: [
      {
        id: 3,
        name: "Class 8",
        batches: [
          { id: 5, name: "Batch A" },
          { id: 6, name: "Batch B" }
        ]
      },
      {
        id: 4,
        name: "Class 7",
        batches: [
          { id: 7, name: "Batch A" },
          { id: 8, name: "Batch B" }
        ]
      }
    ]
  }
];

const studentsData = {
  1: [{ id: 1, name: "John Doe" }, { id: 2, name: "Jane Smith" }],
  2: [{ id: 3, name: "Paul Adams" }, { id: 4, name: "Emily Johnson" }],
  3: [{ id: 5, name: "Michael Brown" }, { id: 6, name: "Linda White" }],
  4: [{ id: 7, name: "David Clark" }, { id: 8, name: "Sarah Lee" }],
  5: [{ id: 9, name: "Chris Green" }, { id: 10, name: "Olivia Black" }],
  6: [{ id: 11, name: "Harry Potter" }, { id: 12, name: "Hermione Granger" }],
  7: [{ id: 13, name: "Ron Weasley" }, { id: 14, name: "Neville Longbottom" }],
  8: [{ id: 15, name: "Draco Malfoy" }, { id: 16, name: "Luna Lovegood" }]
};

function AllottedStudents() {

  

  function removeDuplicatesByKey(array, key) {
    return [...new Map(array.map(item => [item[key], item])).values()];
  }



  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const [Allcentres, setAllCentres] = useState([]);




  useEffect(() => {
    console.log(selectedCenter)
    console.log(selectedCenterData)
  
  })



  useEffect(() => {
    axios.get('/user/allottedAreas')
    .then((response)=>{
          console.log( response.data.data)
          setAllCentres([...response.data.data])
          
          
    })
    .catch((err)=>{
      console.log(err)
    })
  
  
  }, [])




  const handleCenterChange = (e) => {
    const centerId = e.target.value
    setSelectedCenter(centerId);
    setSelectedClass(null); // Reset class on center change
    setSelectedBatch(null); // Reset batch on center change
  };

  const handleClassChange = (e) => {
    const classId = e.target.value
    setSelectedClass(classId);
    setSelectedBatch(null); // Reset batch on class change
  };

  const handleBatchChange = (e) => {
    const batchId = e.target.value
    setSelectedBatch(batchId);
  };



  


  const selectedCenterData = Allcentres.filter((data) =>{
      if(data.centre == selectedCenter) 
       return data
  } );
  const selectedClassData = selectedCenterData?.filter((data) =>{
    if(data.class == selectedClass) 
     return data
} );
  const students = selectedBatch ? studentsData[selectedBatch] : [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Center, Class & Batch Selector</h1>

      {/* Form controls for selecting center, class, and batch */}
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-6">
        {/* Center Selector */}
        <div className="md:w-1/3">
          <label className="block text-gray-800 mb-2">Select Center:</label>
          <select
            value={selectedCenter || ''}
            onChange={handleCenterChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="" disabled>Select a center</option>
            { removeDuplicatesByKey(Allcentres, 'centre')?.map((center,index) => (
              <option key={index} value={center.centre}>
                {center.centre}
              </option>
            ))}
          </select>
        </div>

        {/* Class Selector */}
        {selectedCenter && (
          <div className="md:w-1/3">
            <label className="block text-gray-800 mb-2">Select Class:</label>
            <select
              value={selectedClass || ''}
              onChange={handleClassChange}
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="" disabled>Select a class</option>
              {removeDuplicatesByKey(selectedCenterData, 'class')?.map((cls,index) => (
                <option key={index} value={cls.class}>
                  {cls.class}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Batch Selector */}
        {selectedClass && (
          <div className="md:w-1/3">
            <label className="block text-gray-800 mb-2">Select Batch:</label>
            <select
              value={selectedBatch || ''}
              onChange={handleBatchChange}
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >   
              <option value="" disabled>Select a batch</option>
              {selectedClassData?.map((batch,i) => (
                <option key={i} value={batch.batch}>
                  {batch.batch}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Student List */}
      {selectedBatch && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Students in Batch</h2>

          {/* Scrollable table for wider viewports */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-200 bg-white shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 border-b text-left text-gray-600 text-sm">ID</th>
                  <th className="px-6 py-4 border-b text-left text-gray-600 text-sm">Name</th>
                  {/* Add more columns as needed */}
                  <th className="px-6 py-4 border-b text-left text-gray-600 text-sm">Additional Info</th>
                  <th className="px-6 py-4 border-b text-left text-gray-600 text-sm">Contact</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b text-gray-700 text-sm">{student.id}</td>
                    <td className="px-6 py-4 border-b text-gray-700 text-sm">{student.name}</td>
                    <td className="px-6 py-4 border-b text-gray-700 text-sm">Info {student.id}</td>
                    <td className="px-6 py-4 border-b text-gray-700 text-sm">Contact {student.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllottedStudents;
