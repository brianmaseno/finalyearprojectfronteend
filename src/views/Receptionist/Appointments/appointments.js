
/* eslint-disable */
import React, {useState, useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import ProjectLoading from "components/Loading/projectloading";
import { useBaseUrl } from "hooks/useBaseUrl";
import { useLoggedInUser } from "hooks/useLoggedInUser";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  errorText: {
    color: "red",
    fontSize: "12px",
    marginTop: "4px",
    fontWeight: "400"
  },
  dateInput: {
    position: "relative",
    width: "100%",
    "& input::-webkit-calendar-picker-indicator": {
      background: "transparent",
      bottom: 0,
      color: "transparent",
      cursor: "pointer",
      height: "auto",
      left: 0,
      position: "absolute",
      right: 0,
      top: 0,
      width: "auto"
    }
  }
};

const useStyles = makeStyles(styles);

export default function BookAppointment() {
  const classes = useStyles();
  const [date, setDate] = useState("");
  const [clinicians, setClinicians] = useState([]);
  const { user } = useLoggedInUser();
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const [patientId, setPatientId] = useState("");
  const [patientIdError, setPatientIdError] = useState("");
  const [clinicianId, setClinicianId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [reason, setReason] = useState("");
  const base = useBaseUrl();
  const [clinicianDetails, setClinicianDetails] = useState({});

    const fetchClinicianDetails = async (doctorIds) => {
    try {
      const uniqueIds = [...new Set(doctorIds)];
      const details = {};
      
      for (const id of uniqueIds) {
        // Try alternative endpoint
        const response = await fetch(`${base}/KNH/staff/all`);
        const data = await response.json();
        
        if (data.message === "Found") {
          const staffMember = data.data.find(staff => staff.national_id === id);
          if (staffMember) {
            details[id] = {
              firstname: staffMember.firstname,
              lastname: staffMember.lastname,
              qualification: staffMember.qualification
            };
          }
        }
      }
      
      setClinicianDetails(details);
    } catch (error) {
      console.error("Error fetching clinician details:", error);
      toast.error("Error loading clinician details");
    }
  };

  // Style for date inputs
  useEffect(() => {
    // Add CSS to disable past dates in the date picker
    const style = document.createElement('style');
    style.textContent = `
      .date-input::-webkit-calendar-picker-indicator {
        background-color: rgba(0, 0, 0, 0);
        color: rgba(0, 0, 0, 0);
        cursor: pointer;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 1;
      }
      
      /* Custom styling for disabled dates - works in conjunction with the min attribute */
      input[type="date"]::-webkit-datetime-edit-day-field:disabled,
      input[type="date"]::-webkit-datetime-edit-month-field:disabled,
      input[type="date"]::-webkit-datetime-edit-year-field:disabled,
      input[type="date"]::-webkit-datetime-edit-text:disabled {
        color: #ccc;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Get today's date in YYYY-MM-DD format for the date inputs
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Handle date input change with additional validation
  const handleDateChange = (e, setter) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of day for accurate comparison
    
    if (selectedDate >= today) {
      setter(e.target.value);
    } else {
      toast.error("Cannot select a past date");
      setter(""); // Clear invalid date
    }
  };

  // Validate patient ID (8 digits only)
  const validatePatientId = (value) => {
    if (!value) {
      setPatientIdError("Patient ID is required");
      return false;
    } else if (!/^\d{8}$/.test(value)) {
      setPatientIdError("Patient ID must be exactly 8 digits");
      return false;
    } else {
      setPatientIdError("");
      return true;
    }
  };

  const handlePatientIdChange = (e) => {
    const value = e.target.value;
    // Only allow digits and respect 8 character max length
    if (value === '' || /^\d{0,8}$/.test(value)) {
      setPatientId(value);
      if (value.length === 8) {
        validatePatientId(value);
      } else if (value.length === 0) {
        setPatientIdError("");
      } else {
        setPatientIdError("Patient ID must be exactly 8 digits");
      }
    }
  };

   const check = (e) => {
    e.preventDefault();
  
    if (!date) {
      toast.error("Please select a date");
      return;
    }
  
    // Validate that selected date is not in the past
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      toast.error("Cannot select a past date");
      return;
    }
  
    setLoading(true);
    axios.get(`${base}/KNH/appointments/slots/available/date?date=${date}`)
  .then((data) => {
    if (data.data.message === "Found") {
      console.log("Available clinicians:", data.data.data); // Debug log
      setClinicians(data.data.data);
      const doctorIds = data.data.data.map(item => item.doctor_id);
      console.log("Doctor IDs to fetch:", doctorIds); // Debug log
      fetchClinicianDetails(doctorIds);
          setLoading(false);
          toast.success("Clinician available");
        }
        else{
          console.log("Not Found");
          setLoading(false);
          toast.error("No clinician available");
        }                
    })
    .catch((error) => {
      toast.error("Error checking availability");
      setLoading(false);
      console.log(error);
    });
  };
  const saveAppointment = (e) => {
    e.preventDefault();

    // Validate patient ID
    if (!validatePatientId(patientId)) {
      toast.error("Invalid Patient ID");
      return;
    }

    // Check all required fields
    const fieldsEmpty = clinicianId === "" || appointmentDate === "" || reason === "";
    if (fieldsEmpty) {
      toast.error("All fields are required");
      return;
    }

    // Validate appointment date is not in the past
    const selectedDate = new Date(appointmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      toast.error("Cannot book appointments for past dates");
      return;
    }

    setSaveLoading(true);
    const currDate = new Date();
    const newDate = currDate.getDate() + "/" + (currDate.getMonth() + 1) + "/" + currDate.getFullYear();

    if (clinicianId !== "") {
      let finL;
      for (let index = 0; index < clinicians.length; index++) {
        if (clinicians[index].doctor_id === clinicianId) {
          finL = clinicians[index].doctor_id;
          break; // Exit the loop once found
        }
      }

      if (!finL) {
        toast.error("Selected clinician not found");
        setSaveLoading(false);
        return;
      }

      const details = {
        patient_id: patientId,
        doctor_id: finL,
        date: appointmentDate,
        appointment_reason: reason,
        appointment_due_date: date,
        appointment_created_date: newDate,
        department_id: user.department_id,
        appointment_created_by: user.national_id,
        availability_id: clinicianId
      };
  
      axios({
        method: 'post',
        url: `${base}/KNH/appointments/add`,
        data: details
      })
      .then((data) => {
        if (data.data.message === "Appointment Placed Successfully") {
          console.log("inserted");
          setSaveLoading(false);
          toast.success("Appointment booked successfully");
  
          // Reset form fields
          setPatientId("");
          setClinicianId("");
          setAppointmentDate("");
          setReason("");

          // Send notification
          const message = `New appointment for ${patientId} needs approval`;
          fetch(`${base}/KNH/staff/addNotification?message=${message}&&sender_id=${user.national_id}&&category=${user.qualification}&&receiver_id=${clinicianId}`)
            .then(response => response.json())
            .then((data) => {
              console.log(data);
            });
        }
        else{
          setSaveLoading(false);
          console.log("Not Inserted");
          toast.error(data.data.message || "Appointment not booked");
        }                
      })
      .catch((error) => {
        setSaveLoading(false);
        console.log(error);
        toast.error("Error booking appointment");
      });
    }
  };

  return (
    <>
    <ToastContainer />
    <div className="pathCont">
      <div className="path">
        <p className="pathName">Dashboard / <span>Book Appointment</span></p>
      </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Book Appointment</h4>
            <p className={classes.cardCategoryWhite}>
              Check Available Slots
            </p>
          </CardHeader>
          <CardBody>
            <div className="findContainer">
              <div className="makeContainer">
                <div className="titlePatient">
                    <p className="titleTxt">Check Clinician Availability</p>
                </div>
                <div className="checkBody">
                    <div className="checkAv" style={{marginTop: "15px"}}>
                        <div className={classes.dateInput}>
                          <input 
                            type="date" 
                            className="patText date-input" 
                            min={getTodayDate()}
                            value={date}
                            onChange={(e) => handleDateChange(e, setDate)}
                            onKeyDown={(e) => e.preventDefault()} // Prevent manual entry
                          />
                        </div>
                    </div>
                    <div className="checkAv">
                        <button 
                          className="btnPay" 
                          onClick={check}
                          disabled={!date}
                        >
                          Check Availability
                        </button>
                    </div>
                  </div>
              </div>
              <div className="patientContainer">
                <div className="titlePatient">
                      <p className="titleTxt">Appointment Details</p>
                  </div>
                  <div className="checkBody">
                      <div className="checkAv">
                          <form className="frm">
                            <div className="formCont">
                              <div className="formIn">
                                <label className="labelPat">Patient ID</label>
                                <input 
                                  type="text" 
                                  placeholder="Patient ID (8 digits)" 
                                  className="patInput" 
                                  value={patientId}
                                  maxLength="8"
                                  onKeyPress={(e) => {
                                    // Allow only numbers
                                    if (!/[0-9]/.test(e.key)) {
                                      e.preventDefault();
                                    }
                                  }}
                                  onChange={handlePatientIdChange}
                                />
                                {patientIdError && (
                                  <div className={classes.errorText}>{patientIdError}</div>
                                )}
                              </div>
                            </div>
                            <div className="formCont">
                              <div className="formIn">
                                <label className="labelPat">Clinician</label>
                                                                <select 
                                  className="patInput" 
                                  style={{width: "100%"}} 
                                  value={clinicianId}
                                  onChange={(e) => setClinicianId(e.target.value)}
                                >
                                  <option value="">Select...</option>
                                  {clinicians.length > 0 ? clinicians.map((item, index) => (
                                    <option key={index} value={item.doctor_id}>
                                      {clinicianDetails[item.doctor_id] ? 
                                        `Dr. ${clinicianDetails[item.doctor_id].firstname} ${clinicianDetails[item.doctor_id].lastname} (${clinicianDetails[item.doctor_id].qualification})` : 
                                        'Loading...'}
                                    </option>
                                  )) : null}
                                </select>
                              </div>
                            </div>
                            <div className="formCont">
                              <div className="formIn">
                                <label className="labelPat">Date</label>
                                <div className={classes.dateInput}>
                                  <input 
                                    type="date" 
                                    placeholder="Date" 
                                    className="patInput date-input" 
                                    min={getTodayDate()}
                                    value={appointmentDate}
                                    onChange={(e) => handleDateChange(e, setAppointmentDate)}
                                    onKeyDown={(e) => e.preventDefault()} // Prevent manual entry
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="formCont">
                              <div className="formIn">
                                <label className="labelPat">Reason</label>
                                <textarea 
                                  className="patInput" 
                                  value={reason}
                                  onChange={(e) => setReason(e.target.value)}
                                  placeholder="Enter appointment reason"
                                ></textarea>
                              </div>
                            </div>
                            <div className="formBtn">
                                {!saveLoading ? (
                                  <button 
                                    className="btnUpdate" 
                                    onClick={saveAppointment}
                                    disabled={!patientId || patientIdError || !clinicianId || !appointmentDate || !reason}
                                  >
                                    Save Appointment
                                  </button>
                                ) : (
                                  <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/>
                                )}
                            </div>
                          </form>
                      </div>
                    </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    </>
  );
}