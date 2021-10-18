/* eslint-disable */
import React, {useEffect, useState} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
//import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
//import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import CancelIcon from '@material-ui/icons/Cancel';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { ToastContainer, toast } from "react-toastify";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { usePatients } from "hooks/usePatients";
import { useAppointments } from "hooks/useAppointments";
import ProjectLoading from "components/Loading/projectloading";
import { useBaseUrl } from "hooks/useBaseUrl";
import axios from 'axios';

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
    width: '400px',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#dc3545',
    textAlign: 'center',
  },
  message: {
    fontSize: '16px',
    color: '#444',
    marginBottom: '20px',
    textAlign: 'center',
    lineHeight: '1.5',
  },
  warning: {
    fontSize: '14px',
    color: '#dc3545',
    marginBottom: '20px',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: '20px',
  },
  deleteButton: {
    padding: '8px 25px',
    backgroundColor: '#dc3545',
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

export default function ReceptionistDashboard() {
  const classes = useStyles();
  const { patients } = usePatients();
  const [allPatients, setPatients] = useState([])
  const pending = useAppointments("pending");
  const approved = useAppointments("approved");
  const cancelled = useAppointments("cancelled");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const base = useBaseUrl();
  
  // New state variables for delete confirmation
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

  const searchPatient = (e) => {
    e.preventDefault()
    if (search != "") {
      setPatients([]);
      fetch(`${base}/KNH/patient/allpatients`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Patients Records available") {
              setPatients(data.data.filter((item) => item.identity_no == search))
          }
          else{
              console.log("no Patient");
          }
      })
    }
  }

  const getAllPatients = () => {
    fetch(`${base}/KNH/patient/allpatients`)
    .then(response => response.json())
    .then((data) => {
        if (data.message == "Patients Records available") {
            setPatients(data.data)
        }
        else{
            console.log("no Patient");
        }
    })
  }
  
  // Handler for the Delete button click
  const handleDeleteClick = (patient) => {
    setPatientToDelete(patient);
    setShowDeleteConfirmation(true);
  };
  
  // Handler for confirming deletion
  const handleConfirmDelete = () => {
    if (patientToDelete) {
      axios.get(`${base}/KNH/patient/DeletePatientbyId?patient_id=${patientToDelete.identity_no}`)
        .then((data) => {
          if (data.data.message == "Deleted") {
            toast.success(`Patient ${patientToDelete.firstname} ${patientToDelete.lastname} deleted successfully`);
            setLoading(true);
            setTimeout(() => {
              setPatients([]);
              setLoading(false);
              getAllPatients();
            }, 2000);
          } else {
            toast.error("Failed to delete patient");
          }
        })
        .catch((error) => {
          toast.error("Error occurred while deleting patient");
          console.log(error);
        });
    }
    setShowDeleteConfirmation(false);
    setPatientToDelete(null);
  };
  
  // Handler for canceling deletion
  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setPatientToDelete(null);
  };

  useEffect(() => {
    setLoading(true)
    fetch(`${base}/KNH/patient/allpatients`)
    .then(response => response.json())
    .then((data) => {
        if (data.message == "Patients Records available") {
            setPatients(data.data)
            setLoading(false);
        }
        else{
            console.log("no Patient");
            setLoading(false);
        }
    })
  }, [])

  return (
    <div>
      <ToastContainer />
      
      {/* Delete Confirmation Dialog */}
      {showDeleteConfirmation && patientToDelete && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <div style={modalStyles.title}>
              Delete Patient
            </div>
            <div style={modalStyles.message}>
              Are you sure you want to delete patient:<br />
              <strong>{patientToDelete.firstname} {patientToDelete.lastname}</strong><br />
              ID: {patientToDelete.identity_no}
            </div>
            <div style={modalStyles.warning}>
              This action cannot be undone and will remove all patient records.
            </div>
            <div style={modalStyles.buttonContainer}>
              <button 
                style={modalStyles.deleteButton}
                onClick={handleConfirmDelete}
                onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
              >
                Delete Patient
              </button>
              <button 
                style={modalStyles.cancelButton}
                onClick={handleCancelDelete}
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
                <Icon><PeopleAltIcon /></Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total Patients</p>
              <h3 className={classes.cardTitle}>
                {patients ? patients.length : 0} <small></small>
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
                <PendingActionsIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Pending Appointments</p>
              <h3 className={classes.cardTitle}>{pending ? pending.data.length : 0}</h3>
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
              <p className={classes.cardCategory}>Cancelled Appointment</p>
              <h3 className={classes.cardTitle}>{cancelled ? cancelled.data.length : 0}</h3>
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
                <LibraryAddCheckIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Approved Appointments</p>
              <h3 className={classes.cardTitle}>{approved ? approved.data.length : 0}</h3>
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
              <h4 className={classes.cardTitleWhite}>Patients Information</h4>
              <p className={classes.cardCategoryWhite}>
                All Patients since 20th February, 2025
              </p>
            </CardHeader>
            <CardBody>
              <div className="searchOut">
                <div className="searchCont">
                  <input type="text" className="searchInput" placeholder="Search Patient By ID" onChange={(e) => {
                    if (e.target.value === "") {
                      getAllPatients();
                    }
                    else{
                      setSearch(e.target.value);
                      setPatients(patients.filter((item) => item.identity_no == e.target.value));
                    }
                  }}/>
                  <button className="btnSearch" onClick={searchPatient}>Search</button>
                </div>
              </div>
              {!loading ? 
              <>
              {allPatients.length > 0 ? 
              <table className="styled-table">
                <thead>
                  <tr style={{marginBottom: "20px"}}>
                    <th>Identity Number</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>County</th>
                    <th>Telephone</th>
                    <th>Gender</th>
                    <th style={{textAlign: "center"}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                {allPatients.length > 0 ? allPatients.map((item) => (
                      <tr key={item.identity_no}>
                        <td>{item.identity_no}</td>
                        <td>{item.firstname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.county}</td>
                        <td>{item.telephone}</td>
                        <td>{item.gender}</td>
                        <td style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <div className="editContainer">
                          <p 
                            className="editP" 
                            style={{backgroundColor: "#11b8cc"}} 
                            onClick={() => handleDeleteClick(item)}
                          >
                            Delete
                          </p>
                        </div>
                      </td>
                    </tr>
                    )) : null}
                </tbody>
              </table>
              :
              <div className="noData">
                <p className="txtNo">No Patient Information</p>
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