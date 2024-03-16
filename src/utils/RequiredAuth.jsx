import React, { useContext } from 'react'
import { JWTContext } from '../contexts/JwtProvider'
import { Navigate } from 'react-router-dom';

const RequiredAuth = ({children}) => {

  const {isLoggedIn} = useContext(JWTContext);

  if(!isLoggedIn){
    return <Navigate to={"/login"}/>
  }

  return children;
}

export default RequiredAuth
