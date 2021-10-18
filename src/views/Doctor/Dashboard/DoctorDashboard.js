/* eslint-disable */
import React, {useEffect, useState} from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import CancelIcon from '@material-ui/icons/Cancel';
// @material-ui/icons
import DateRange from "@material-ui/icons/DateRange";
import Update from "@material-ui/icons/Update";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { useDoctorAppointments } from "hooks/useDoctorAppointments";
import { usePatients } from "hooks/usePatients";
import ProjectLoading from "components/Loading/projectloading";
import { ToastContainer, toast } from "react-toastify";
import { useBaseUrl } from "hooks/useBaseUrl";
import { useLoggedInUser } from "hooks/useLoggedInUser";

// Modal styles for confirmation dialog
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
    width: '450px',
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
  message: {
    fontSize: '16px',
    color: '#444',
    marginBottom: '20px',
    textAlign: 'center',
    lineHeight: '1.5',
  },
  details: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '20px',
    padding: '10px 15px',
    backgroundColor: '#f8f8f8',
    borderRadius: '4px',
    width: '90%',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: '20px',
  },
  confirmButton: {
    padding: '8px 25px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  cancelButton: {
    padding: '8px 25px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  }
};

const useStyles = makeStyles(styles);

export default function DoctorDashboard() {
  const classes = useStyles();
  const { user } = useLoggedInUser();
  const [pending, setPending] = useState([]);
  const approved = useDoctorAppointments("approved", user.national_id);
  const pendingData = useDoctorAppointments("pending", user.national_id);
  const cancelled = useDoctorAppointments("cancelled", user.national_id);
  const { patients } = usePatients();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const base = useBaseUrl();
  
  // State variables for approval confirmation
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [appointmentToApprove, setAppointmentToApprove] = useState(null);

  const searchAppointment = (e) => {
    e.preventDefault();
    if (search != "") {
      setPending([]);
      fetch(`${base}/KNH/appointments/doctor/pending?doctor_id=${user.national_id}`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Found") {
              setPending(data.data.filter((item) => item.patient_id == search));
          }
          else{
              console.log("no Patient");
          }
      });
    }
  };

  const getAllPendingAppointments = () => {
    fetch(`${base}/KNH/appointments/doctor/pending?doctor_id=${user.national_id}`)
    .then(response => response.json())
    .then((data) => {
        if (data.message == "Found") {
            setPending(data.data);
        }
        else{
            console.log("no Patient");
        }
    });
  };

  // Handler for showing confirmation dialog
  const handleApproveClick = (appointment) => {
    setAppointmentToApprove(appointment);
    setShowConfirmation(true);
  };
  
  // Handler for confirming approval
  const handleConfirmApproval = () => {
    if (appointmentToApprove) {
      fetch(`${base}/KNH/appointments/approve?appointment_id=${appointmentToApprove.appointment_id}`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Appointment Approved Successfully") {
            const message = `Appointment ${appointmentToApprove.appointment_id} has been approved successfully`;
            fetch(`${base}/KNH/staff/addNotification?message=${message}&&sender_id=${user.national_id}&&category=${user.qualification}&&receiver_id=${appointmentToApprove.appointment_created_by}`)
              .then(response => response.json())
              .then((data) => {
                  console.log(data);
              });

            toast.success("Appointment Approved Successfully");
            setPending([]);
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              getAllPendingAppointments();
            }, 2000);
          }
          else{
            toast.error("Appointment Not Approved");
          }
      })
      .catch(error => {
        console.error("Error approving appointment:", error);
        toast.error("Error approving appointment");
      });
    }
    
    setShowConfirmation(false);
    setAppointmentToApprove(null);
  };
  
  // Handler for canceling approval
  const handleCancelApproval = () => {
    setShowConfirmation(false);
    setAppointmentToApprove(null);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${base}/KNH/appointments/doctor/pending?doctor_id=${user.national_id}`)
          .then(response => response.json())
          .then((data) => {
              if (data.message == "Found") {
                  setPending(data.data);
                  setLoading(false);
              }
              else{
                  setLoading(false);
              }
          });
  }, []);
  
  return (
    <div>
      <ToastContainer />
      
      {/* Confirmation Dialog */}
      {showConfirmation && appointmentToApprove && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <div style={modalStyles.title}>
              Confirm Appointment Approval
            </div>
            <div style={modalStyles.message}>
              Are you sure you want to approve this appointment?
            </div>
            <div style={modalStyles.details}>
              <div><strong>Appointment ID:</strong> {appointmentToApprove._id}</div>
              <div><strong>Appointment Date:</strong> {appointmentToApprove.appointment_due_date}</div>
              <div><strong>Patient ID:</strong> {appointmentToApprove.patient_id}</div>
              <div><strong>Department:</strong> {appointmentToApprove.department_id}</div>
              {appointmentToApprove.appointment_reason && (
                <div><strong>Reason:</strong> {appointmentToApprove.appointment_reason}</div>
              )}
            </div>
            <div style={modalStyles.buttonContainer}>
              <button 
                style={modalStyles.confirmButton}
                onClick={handleConfirmApproval}
                onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
              >
                Approve
              </button>
              <button 
                style={modalStyles.cancelButton}
                onClick={handleCancelApproval}
                onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon><AccessTimeFilledIcon /></Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total Appointments</p>
              <h3 className={classes.cardTitle}>
                {(pendingData.data.length + cancelled.data.length + approved.data.length) > 0  ? (pendingData.data.length + cancelled.data.length + approved.data.length) : 0} <small></small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <PendingIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Pending Appointments</p>
              <h3 className={classes.cardTitle}>{pendingData.data ? pendingData.data.length : 0}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <CancelIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Cancelled</p>
              <h3 className={classes.cardTitle}>{cancelled.data ? cancelled.data.length : 0}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <CheckCircleIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Approved Appointments</p>
              <h3 className={classes.cardTitle}>{approved.data ? approved.data.length : 0}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Pending Appointments</h4>
              <p className={classes.cardCategoryWhite}>
                All Pending appointments since 10th January, 2025
              </p>
            </CardHeader>
            <CardBody>
              <div className="searchOut">
                <div className="searchCont">
                  <input 
                    type="text" 
                    className="searchInput" 
                    placeholder="Search Appointment By Patient ID" 
                    onChange={(e) => {
                      if (e.target.value === "") {
                        getAllPendingAppointments();
                      }
                      else{
                        setSearch(e.target.value);
                        setPending(pending.filter((item) => item.patient_id == e.target.value));
                      }
                    }}
                  />
                  <button className="btnSearch" onClick={searchAppointment}>Search</button>
                </div>
              </div>
              {!loading ? 
              <>
              {pending.length > 0 ?
              <table className="styled-table">
                <thead>
                  <tr style={{marginBottom: "20px"}}>
                    <th>Appointment ID</th>
                    <th>Appointment Date</th>
                    <th>Patient ID</th>
                    <th>Clinician ID</th>
                    <th>Department ID</th>
                    <th style={{textAlign: "center"}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                {pending.length > 0 ? pending.map((item) => (
                        <tr key={item._id}>
                          <td>{item._id}</td>
                          <td>{item.appointment_due_date}</td>
                          <td>{item.patient_id}</td>
                          <td>{item.doctor_id}</td>
                          <td>{item.department_id}</td>
                          <td style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                            <div className="editContainer">
                              <p 
                                className="editP" 
                                style={{backgroundColor: "green"}} 
                                onClick={() => handleApproveClick(item)}
                              >
                                Approve
                              </p>
                            </div>
                          </td>
                      </tr>
                    )) : null}
                </tbody>
              </table>
              : 
              <div className="noData">
                <p className="txtNo">No Pending Appointment</p>
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
    </div>
  );
}