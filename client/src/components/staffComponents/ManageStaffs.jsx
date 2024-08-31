import React from 'react';
import AuthorsTable from './StaffTable';

const ManageStaffs = () => {
  const authorsData = [
    {
      name: 'John Michael',
      email: 'john@creative-tim.com',
      image: 'https://via.placeholder.com/40',
      function: { title: 'Manager', department: 'Organization' },
      status: 'Online',
      employed: '23/04/18'
    },
    {
      name: 'Alexa Liras',
      email: 'alexa@creative-tim.com',
      image: 'https://via.placeholder.com/40',
      function: { title: 'Programator', department: 'Developer' },
      status: 'Offline',
      employed: '11/01/19'
    },
    {
      name: 'Laurent Perrier',
      email: 'laurent@creative-tim.com',
      image: 'https://via.placeholder.com/40',
      function: { title: 'Executive', department: 'Projects' },
      status: 'Online',
      employed: '19/09/17'
    },
    // Add more author objects as needed
  ];

  return <AuthorsTable authors={authorsData} />;
};

export default ManageStaffs;