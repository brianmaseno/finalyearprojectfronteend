/* eslint-disable */
import React, {useState} from 'react'
import { ToastContainer, toast } from "react-toastify";
//import ReactLoading from "react-loading";
import "react-toastify/dist/ReactToastify.css";
import { Link, useHistory } from "react-router-dom";
import logo from '../../assets/img/logoknh.jpg';
import { useAuth } from "hooks/AuthProvider";
import '../staff/login.css';
import { useBaseUrl } from '../../hooks/useBaseUrl';

export default function AdminLogComponent() {
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [logged, setLogged] = useState(false);
  const history = useHistory();
  const { setCurrentUser } = useAuth();
  const base = useBaseUrl()

  const checkUser = (e) => {
    e.preventDefault();
    const resolveAfterSec = new Promise((resolve, reject) => {
      setTimeout(logged !== true ? reject: resolve, 3000);
    });

    //toast.promise(resolveAfterSec, {pending: 'Loading', success: 'Login Successful Redirecting.....', error: "Wrong username or password"});
    const status = password === "";

    if (!status) {
      logged ? toast.info("Validating credentials.....") : null;
      fetch(`${base}/KNH/staff/login?username=admin&&password=${password}`)
          .then(response => response.json())
          .then((data) => {
              if (data.message == "Not Found") {
                  toast.error("Wrong password");
                  console.log("Not Found")
                  setLogged(false);
              }
              else{
                toast.success("login successful redirecting.....");
                setLogged(true);
                setUser(data.data)
                console.log(data.data.status);
                
                if (data.data.status == "activated") {
                  sessionStorage.setItem("user", data.data.username)
                  sessionStorage.setItem("status", data.data.status)
                  setCurrentUser(data.data);
                  history.push('/admin');
                }
                else{
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

  return (
    <>
    <ToastContainer position="top-center"/>
    <div className="containerLogin">
      <div className="avatar">
          <img src={logo} className="imageLogo"/>
      </div>
      <h2 className="headingLogin">Sign In</h2>
      <div className="inputs">
          <form className="formLogin" onSubmit={checkUser}>
              <label className="labelText">Password</label><br/>
              <input type="password" name="username" placeholder="Enter Password" required className="inputLogin" onChange={(e) => setPassword(e.target.value)}/><br/>
              <button type="submit" className="btnSubmit">Submit</button><br/>
          </form>
      </div>
      <div className="right">
          <p href="" className="admin"><Link to="/login" className="admin">Login as Staff</Link></p>
      </div>
    </div>
    </>
  )
}
