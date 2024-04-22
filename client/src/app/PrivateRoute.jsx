import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AccessDenied from './AccessDenied';

function PrivateRoute(props) {
    const { user } = useSelector((state) => state.user);
     const value = props.userType.includes(user.role)
  return (
    <>
    
    {value && props.comp}
    {!value && <AccessDenied></AccessDenied>}
    </>
  )
}

export default PrivateRoute