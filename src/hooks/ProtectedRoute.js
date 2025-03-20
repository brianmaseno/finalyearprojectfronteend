/* eslint-disable */
import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export const ProtectedRoute = ({children, ...rest}) => {
  const { currentUser, loggedOut } = useAuth();
  return (
    <Route
    {...rest}
    render={({ location }) => currentUser ? children : 
    (
      <Redirect to={{pathname: "/login", state: {from: location}}} />
    )}/>
  )
}
