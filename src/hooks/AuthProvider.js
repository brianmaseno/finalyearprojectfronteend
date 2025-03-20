/* eslint-disable */
import React, { useContext, useState } from 'react';

const AuthContext = React.createContext(null);

export const AuthProvider = ({ user, children }) => {
  const [currentUser, setCurrentUser] = useState(user);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);