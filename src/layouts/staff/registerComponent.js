/* eslint-disable */
import { useBaseUrl } from 'hooks/useBaseUrl';
import React, {useState, useEffect} from 'react'
import {
    Link,
    useHistory
  } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
//import ReactLoading from "react-loading";
import "react-toastify/dist/ReactToastify.css";
import logo from '../../assets/img/logoknh.jpg';
import './register.css';

export default function RegisterComponent() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [qualification, setQualification] = useState("");
    const [access_level, setAccessLevel] = useState("");
    const [joining_date, setJoiningDate] = useState("");
    const [added_on, setAddedOn] = useState("");
    const [added_by, setAddedBy] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [nationalId, setNationalId] = useState("");
    const [nationalIdError, setNationalIdError] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const history = useHistory();
    const baseUrl = useBaseUrl();

    // Set joining date to current date when component mounts
    useEffect(() => {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format
      setJoiningDate(formattedDate);
    }, []);

    // Validate password strength
    const validatePassword = (password) => {
      if (password.length < 8) {
        setPasswordError("Password must be at least 8 characters long");
        return false;
      } else {
        setPasswordError("");
        return true;
      }
    };

    // Validate National ID
    const validateNationalId = (id) => {
      if (id.length !== 8) {
        setNationalIdError("National ID must be exactly 8 characters");
        return false;
      } else {
        setNationalIdError("");
        return true;
      }
    };

    const handlePasswordChange = (e) => {
      const newPassword = e.target.value;
      setPassword(newPassword);
      validatePassword(newPassword);
    };

    const handleNationalIdChange = (e) => {
      const newId = e.target.value;
      setNationalId(newId);
      validateNationalId(newId);
    };

    const checkUser = (e) => {
      e.preventDefault();

      const message = `${username} has created an account and is requesting for the account to be activated`;

      const pass = password === confirmpassword;
      const strongPassword = validatePassword(password);
      const validId = validateNationalId(nationalId);
      const check = qualification == "" || gender == "";

      if (check) {
        toast.error("Parameter Missing");
      }
      else if (!strongPassword) {
        toast.error("Password must be at least 8 characters long");
      }
      else if (!validId) {
        toast.error("National ID must be exactly 8 characters");
      }
      else {
          if (pass) {
            // Use current date as joining date
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            
            const staffDetails = {
                username: username,
                firstname: firstname,
                lastname: lastname,
                gender: gender,
                qualification: qualification,
                access_level: access_level,
                joining_date: formattedDate, // Use today's date
                password: password,
                added_on: added_on,
                added_by: added_by,
                national_id: nationalId
            }
  
            axios({
                method: 'post',
                url: `${baseUrl}/KNH/staff/register`,
                data: staffDetails})
                .then((data) => {
                    if (data.data.message != "Inserted Successfully") {
                        toast.error("Not Registered");
                    }
                    else{
                        toast.success("Registration successful, wait for account activation");
                        const receiver_id = "12345";
                        fetch(`${baseUrl}/KNH/staff/addNotification?message=${message}&&sender_id=${nationalId}&&category=${qualification}&&receiver_id=${receiver_id}`)
                        .then(response => response.json())
                        .then((data) => {
                            console.log(data);
                        })
                        
                        setTimeout(() => {
                            history.push("/login");
                        }, 3000);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
          }
          else {
            toast.error("Passwords do not match");
          }
        }
      }

  return (
    <div className="containerRegister">
      <div className="avatar">
          <img src={logo} className="imageLogo"/>
      </div>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <h2 className="headingRegister">Sign Up</h2>
      <div className="inputs">
          <form className="formLogin" onSubmit={checkUser}>
              <div className="nameSection">
                  <div className="firstN">
                      <label className="labelRegister">First Name</label><br/>
                      <input type="text" name="firstname" placeholder="Enter First Name" required className="inputRegister" onChange={(e) => setFirstname(e.target.value)} />
                  </div>
                  <div className="lastN">
                      <label className="labelRegister">Last Name</label><br/>
                      <input type="text" name="lastname" placeholder="Enter Last Name" required className="inputRegister" onChange={(e) => setLastname(e.target.value)} />
                  </div>
                  <div className="userN">
                      <label className="labelRegister">Username</label><br/>
                      <input type="text" name="username" placeholder="Enter Username" required className="inputRegister" onChange={(e) => setUsername(e.target.value)} /><br/>
                  </div>
              </div>
              
              <div className="nameSection">
                  <div className="firstN">
                      <label className="labelText">Qualification</label><br/>
                      <select className="inputSelect" required onChange={(e) => {setQualification(e.target.value); setAccessLevel(e.target.value)}}>
                          <option>Select---</option>
                          <option value="Doctor">Doctor</option>
                          <option value="Pharmacist">Pharmacist</option>
                          <option value="Receptionist">Receptionist</option>
                          <option value="Lab Technician">Lab Technician</option>
                          <option value="Accountant">Accountant</option>
                      </select>
                  </div>
                  <div className="userN">
                      <label className="labelText">Select Gender</label><br/>
                      <select className="inputSelect" required onChange={(e) => setGender(e.target.value)}>
                          <option>Select---</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                      </select>
                  </div>
                  <div className="lastN">
                      <label className="labelText">National ID</label><br/>
                      <input 
                        type="text" 
                        name="id" 
                        placeholder="Exactly 8 characters" 
                        required 
                        className="inputRegister" 
                        onChange={handleNationalIdChange}
                        maxLength={8}
                        style={{ borderColor: nationalIdError ? "#ff6b6b" : "" }} 
                      /><br/>
                      {nationalIdError && <p style={{ color: "#ff6b6b", fontSize: "12px", margin: "5px 0 0" }}>{nationalIdError}</p>}
                  </div>
              </div>

              <div className="nameSection">
                  <div className="firstN">
                      <label className="labelText">Password</label><br/>
                      <input 
                        type="password" 
                        name="password" 
                        placeholder="Min. 8 characters" 
                        required 
                        className="inputRegister" 
                        onChange={handlePasswordChange} 
                        style={{ borderColor: passwordError ? "#ff6b6b" : "" }}
                      /><br/>
                      {passwordError && <p style={{ color: "#ff6b6b", fontSize: "12px", margin: "5px 0 0" }}>{passwordError}</p>}
                  </div>
                  <div className="lastN">
                      <label className="labelText">Confirm Password</label><br/>
                      <input 
                        type="password" 
                        name="confirmpassword" 
                        placeholder="Confirm Password" 
                        required 
                        className="inputRegister" 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={password.length < 8}
                      /><br/>
                  </div>
                  <div className="userN">
                      {/* This div is kept for layout consistency but no input is placed here */}
                  </div>
              </div>
              <button 
                type="submit" 
                className="btnSubmitRegister"
                disabled={password.length < 8 || nationalId.length !== 8}
                style={{ opacity: (password.length < 8 || nationalId.length !== 8) ? 0.7 : 1 }}
              >
                Submit
              </button><br/>
          </form>
      </div>
      <div className="rightRegister">
          <p className="admin"><Link to="/login" className="admin">Already have an account?</Link></p>
      </div>
    </div>
  )
}