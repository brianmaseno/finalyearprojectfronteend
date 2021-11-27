/* eslint-disable */
import React, { useState, useEffect } from "react";
import "./login.css";
import { ToastContainer, toast } from "react-toastify";
//import ReactLoading from "react-loading";
import "react-toastify/dist/ReactToastify.css";
import { Link, useHistory } from "react-router-dom";
import logo from '../../assets/img/logoknh.jpg';
import { useAuth } from "hooks/AuthProvider";
import { useBaseUrl } from "../../hooks/useBaseUrl";

export default function LogComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [logged, setLogged] = useState(false);
  const history = useHistory();
  const { setCurrentUser } = useAuth();
  const [loading, setLoading] = useState(false)
  const base = useBaseUrl()

  const checkUser = (e) => {
    e.preventDefault();
    toast.info("Validating credentials.....")
    //toast.promise(resolveAfterSec, {pending: 'Loading', success: 'Login Successful Redirecting.....', error: "Wrong username or password"});
    const status = username === "" || password === "";

    if (!status) {
      setLoading(true)
      fetch(`${base}/KNH/staff/login?username=${username}&&password=${password}`)
          .then(response => response.json())
          .then((data) => {
              if (data.message == "Not Found") {
                  toast.error("Wrong username or password");
                  console.log("Not Found")
                  setLogged(false);
              }
              else{                
                if (data.data.status == "activated") {
                  toast.success("login successful redirecting.....");
                  setTimeout(() => {
                    setLogged(true);
                    setUser(data.data)
                    sessionStorage.setItem("user", data.data.username)
                    sessionStorage.setItem("UserId", data.data.national_id)
                    sessionStorage.setItem("status", data.data.status)
                    setCurrentUser(data.data);

                    if (data.data.access_level == "Doctor") {
                      history.push('/doctor');
                    }
                    else if (data.data.access_level == "Receptionist") {
                      history.push('/receptionist');
                    }
                    else if (data.data.access_level == "Pharmacist") {
                      history.push('/pharmacist');
                    }
                    else if (data.data.access_level == "Lab Technician") {
                      history.push('/lab');
                    }
                    else if (data.data.access_level == "Accountant") {
                      history.push('/billing');
                    }
                    else {
                      history.push("/login")
                    }
                  }, 2000);
                  
                }
                else{
                  toast.error("Account not approved");
                  console.log("Not Passed");
                
                }  
              }
          })
          .catch((error) => {
              console.log(error);
          });
    }
    else{
        alert("Enter Data");
    }
  };

  useEffect(() => {
    setCurrentUser(null);
  }, [])

  return (
    <>
    <ToastContainer position="top-center" autoClose={2000} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    <div className="containerLogin">
      <div className="avatar">
        <img src={logo} className="imageLogo"/>
      </div>
      <h2 className="headingLogin">Sign In</h2>
      <div className="inputs">
        <form className="formLogin" onSubmit={checkUser}>
          <label className="labelText">Username</label><br/>
          <input type="text" name="username" placeholder="Enter Username" required className="inputLogin" onChange={(e) => setUsername(e.target.value)} /><br/>
          <label className="labelText">Password</label><br/>
          <input type="password" name="username" placeholder="Enter Password" required className="inputLogin" onChange={(e) => setPassword(e.target.value)}/><br/>
          <button type="submit" className="btnSubmit">Submit</button><br/>
        </form>
      </div>
      <div className="right">
        <p className="account"><Link to="/register" className="admin">Don't have an account?</Link></p>
        <p className="admin"><Link to="/adminlogin" className="admin">Login as admin</Link></p>
    </div>
    </div>
    </>
  );
}
