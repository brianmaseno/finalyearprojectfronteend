/* eslint-disable */
import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { useLoggedInUser } from './useLoggedInUser';

export const ProtectedRoute = ({children, ...rest}) => {
  const { user } = useLoggedInUser();
  return (
    <Route
    {...rest}
    render={({ location }) => user && !(user === undefined) ? children : 
    (
      <Redirect to={{pathname: "/login", state: {from: location}}} />
    )}/>
  )
}
