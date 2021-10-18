/* eslint-disable */  // Disables ESLint for this file

// Authentication and route protection imports
import { AuthProvider } from 'hooks/AuthProvider';  // Context provider for authentication state
import { ProtectedRoute } from 'hooks/ProtectedRoute';  // Component that restricts access to authenticated users only

// Layout component imports for different user roles
import Admin from 'layouts/Admin';  // Admin dashboard layout
import AdminLogin from 'layouts/AdminLogin';  // Admin-specific login screen
import Billing from 'layouts/billing';  // Billing department dashboard
import Doctor from 'layouts/Doctor';  // Doctor's dashboard layout
import Lab from 'layouts/Lab';  // Laboratory dashboard layout
import Login from 'layouts/Login';  // Main login screen
import Pharmacist from 'layouts/phamacists';  // Pharmacist dashboard layout
import Receptionist from 'layouts/Receptionist';  // Receptionist dashboard layout
import StaffRegister from 'layouts/StaffRegister';  // Staff registration page

// React core imports
import React, {useState, useEffect} from 'react';  // React core and hooks for state management
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';  // Routing components from React Router v5

export default function App() {
  // State to store the current user information
  const [user, setUser] = useState({});
  
  // Effect hook to check for user session on component mount and when user changes
  useEffect(() => {
    // Retrieve user data from browser's session storage
    const currentUser = sessionStorage.getItem("user");
    // If user exists in session storage, update state
    if (currentUser != null && !(currentUser == undefined)) {
      setUser(currentUser);
    }
    // If no user found in session storage, set user to null (unauthenticated)
    else{
      setUser(null);
    }
  }, [user])  // Dependency array includes user to re-run effect when user changes
  
  return (
    <>
    {/* AuthProvider wraps the app to provide authentication context */}
    <AuthProvider user={user}>
      {/* BrowserRouter enables routing functionality */}
      <BrowserRouter>
        {/* Switch ensures only one route renders at a time */}
        <Switch>
          {/* Public routes that don't require authentication */}
          <Route path="/login" component={Login} />  {/* Main login page */}
          <Route path="/register" component={StaffRegister} />  {/* Staff registration page */}
          <Route path="/adminlogin" component={AdminLogin} />  {/* Admin login page */}
          
          {/* Protected routes that require authentication */}
          <ProtectedRoute path="/admin"><Admin /></ProtectedRoute>  {/* Admin dashboard - restricted access */}
          <ProtectedRoute path="/doctor"><Doctor /></ProtectedRoute>  {/* Doctor dashboard - restricted access */}
          <ProtectedRoute path="/lab"><Lab /></ProtectedRoute>  {/* Laboratory dashboard - restricted access */}
          <ProtectedRoute path="/pharmacist"><Pharmacist /></ProtectedRoute>  {/* Pharmacist dashboard - restricted access */}
          <ProtectedRoute path="/receptionist"><Receptionist /></ProtectedRoute>  {/* Receptionist dashboard - restricted access */}
          <ProtectedRoute path="/billing"><Billing /></ProtectedRoute>  {/* Billing dashboard - restricted access */}
          
          {/* Default route - redirects to login page if no other routes match */}
          <Redirect from="/" to="/login" />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
    </>
  )
}