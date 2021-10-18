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
  
};

// Modal styles
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    width: '400px',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: '20px',
  },
  yesButton: {
    padding: '8px 25px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  noButton: {
    padding: '8px 25px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  }
};

const useStyles = makeStyles(styles);

export default function DoctorApprovedAppointments() {

  const classes = useStyles();
  const [approved, setApproved] = useState([])
  const { user } = useLoggedInUser();
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false);
  const base = useBaseUrl();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [patients, setPatients] = useState({});

        const fetchPatientDetails = async (patientIds) => {
      try {
        const uniqueIds = [...new Set(patientIds)]; // Remove duplicates
        const patientDetails = {};
        
        for (const id of uniqueIds) {
          const response = await fetch(`${base}/KNH/patient/CheckPatientbyId?patient_id=${id}`);
          const data = await response.json();
          if (data.data) {
            patientDetails[id] = {
              firstname: data.data[0].firstname,
              lastname: data.data[0].lastname
            };
          }
        }
        
        setPatients(patientDetails);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

  const searchAppointment = (e) => {
    e.preventDefault()
    if (search != "") {
      setApproved([]);
      fetch(`${base}/KNH/appointments/doctor/approved?doctor_id=${user.national_id}`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Found") {
              setApproved(data.data.filter((item) => item.patient_id == search))
          }
          else{
              console.log("no Patient");
          }
      })
    }
  }

    const getAllApprovedAppointments = () => {
    fetch(`${base}/KNH/appointments/doctor/approved?doctor_id=${user.national_id}`)
    .then(response => response.json())
    .then((data) => {
        if (data.message == "Found") {
            setApproved(data.data);
            // Fetch patient details for all appointments
            const patientIds = data.data.map(item => item.patient_id);
            fetchPatientDetails(patientIds);
        } else {
            console.log("no Patient");
        }
    });
  };

  // Handle opening the confirmation dialog
  const handleCancelClick = (appointmentId) => {
    setSelectedAppointment(appointmentId);
    setShowConfirmation(true);
  };

  // Handle the actual cancellation
  const handleConfirmCancel = () => {
    if (selectedAppointment) {
      fetch(`${base}/KNH/appointments/cancel?appointment_id=${selectedAppointment}`)
        .then(response => response.json())
        .then((data) => {
          if (data.message == "Appointment Cancelled Successfully") {
            toast.success("Appointment Cancelled Successfully");
            setApproved([]);
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              getAllApprovedAppointments();
            }, 2000);
          } else {
            toast.error("Appointment Not Cancelled");
          }
        })
        .catch(error => {
          toast.error("Error cancelling appointment");
          console.error(error);
        });
    }
    setShowConfirmation(false);
  };

  // Handle closing the confirmation without cancelling
  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
    setSelectedAppointment(null);
  };

    useEffect(() => {
    setLoading(true);
    fetch(`${base}/KNH/appointments/doctor/approved?doctor_id=${user.national_id}`)
      .then(response => response.json())
      .then((data) => {
        if (data.message == "Found") {
          setApproved(data.data);
          // Fetch patient details
          const patientIds = data.data.map(item => item.patient_id);
          fetchPatientDetails(patientIds);
          setLoading(false);
        } else {
          console.log("no data");
          setLoading(false);
        }
      });
  }, []);

  return (
    <>
    <ToastContainer />
    
    {/* Confirmation Modal */}
    {showConfirmation && (
      <div style={modalStyles.overlay}>
        <div style={modalStyles.modal}>
          <div style={modalStyles.title}>
            Are you sure you want to cancel this appointment?
          </div>
          <div style={modalStyles.buttonContainer}>
            <button 
              style={modalStyles.yesButton} 
              onClick={handleConfirmCancel}
              onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
            >
              Yes
            </button>
            <button 
              style={modalStyles.noButton} 
              onClick={handleCancelConfirmation}
              onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
            >
              No
            </button>
          </div>
        </div>
      </div>
    )}
    
    <div className="pathCont">
        <div className="path">
            <p className="pathName">Dashboard / <span>Approved Appointments</span></p>
        </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Approved Appointments</h4>
            <p className={classes.cardCategoryWhite}>
              Appointments
            </p>
          </CardHeader>
          <CardBody>
            <div className="searchOut">
                  <div className="searchCont">
                    <input type="text" className="searchInput" placeholder="Search Appointment By Patient ID" onChange={(e) => {
                      if (e.target.value === "") {
                        getAllApprovedAppointments()
                      }
                      else{
                        setSearch(e.target.value)
                        setApproved(approved.filter((item) => item.patient_id == e.target.value))
                      }
                    }}/>
                    <button className="btnSearch" onClick={searchAppointment}>Search</button>
                  </div>
                </div>
                {!loading ? 
                <>
                {approved.length > 0 ?
                <table className="styled-table">
                <thead>
                  <tr style={{marginBottom: "20px"}}>
                    <th>Patient ID</th>  {/* Changed from Appointment ID */}
                    <th>Appointment Date</th>
                    <th>Patient Name</th>
                    <th>Clinician ID</th>
                    <th>Department ID</th>
                    <th style={{textAlign: "center"}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {approved.length > 0 ? approved.map((item) => (
                    <tr key={item._id || item.appointment_id}>
                      <td>{item.patient_id}</td>  {/* Changed from item._id */}
                      <td>{item.appointment_due_date}</td>
                      <td>
                        {patients[item.patient_id] ? 
                          `${patients[item.patient_id].firstname} ${patients[item.patient_id].lastname}` :
                          'Loading...'
                        }
                      </td>
                      <td>{item.doctor_id}</td>
                      <td>{item.department_id}</td>
                      <td style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <div className="editContainer">
                          <p 
                            className="editP" 
                            style={{backgroundColor: "red"}} 
                            onClick={() => handleCancelClick(item.appointment_id)}
                          >
                            Cancel
                          </p>
                        </div>
                      </td>
                    </tr>
                  )) : null}
                </tbody>
              </table>
                : 
                  <div className="noData">
                  <p className="txtNo">No Approved Appointment</p>
                </div>
                }
                </>
                :
                <div className="load">
                  <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/>
                </div>
                }
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    </>
  );
}