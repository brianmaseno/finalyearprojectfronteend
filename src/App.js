/* eslint-disable */
import { AuthProvider } from 'hooks/AuthProvider';
import { ProtectedRoute } from 'hooks/ProtectedRoute';
import Admin from 'layouts/Admin';
import AdminLogin from 'layouts/AdminLogin';
import Billing from 'layouts/billing';
import Doctor from 'layouts/Doctor';
import Lab from 'layouts/Lab';
import Login from 'layouts/Login';
import Pharmacist from 'layouts/phamacists';
import Receptionist from 'layouts/Receptionist';
import StaffRegister from 'layouts/StaffRegister';
import React, {useState, useEffect} from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';

export default function App() {
  const [user, setUser] = useState({});
  
  useEffect(() => {
    const currentUser = sessionStorage.getItem("user");
    if (currentUser != null && !(currentUser == undefined)) {
      setUser(currentUser);
    }
    else{
      setUser(null);
    }
  }, [user])
  return (
    <>
    <AuthProvider user={user}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={StaffRegister} />
          <Route path="/adminlogin" component={AdminLogin} />
          <ProtectedRoute path="/admin"><Admin /></ProtectedRoute>
          <ProtectedRoute path="/doctor"><Doctor /></ProtectedRoute>
          <ProtectedRoute path="/lab"><Lab /></ProtectedRoute>
          <ProtectedRoute path="/pharmacist"><Pharmacist /></ProtectedRoute>
          <ProtectedRoute path="/receptionist"><Receptionist /></ProtectedRoute>
          <ProtectedRoute path="/billing"><Billing /></ProtectedRoute>
          <Redirect from="/" to="/login" />
        </Switch>
      </BrowserRouter>
  </AuthProvider>
  </>
  )
}
