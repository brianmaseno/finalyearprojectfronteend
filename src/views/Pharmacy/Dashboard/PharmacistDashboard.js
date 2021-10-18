/* eslint-disable */
import React, {useEffect, useState} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
//import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import BlockIcon from '@material-ui/icons/Block';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { usePrescribedDrugs } from "hooks/usePrescribedDrugs";
import ProjectLoading from "components/Loading/projectloading";
import { useBaseUrl } from "hooks/useBaseUrl";
import { ToastContainer, toast } from "react-toastify";
import { useLoggedInUser } from "hooks/useLoggedInUser"; // Added import for user info

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
  userInfo: {
    fontSize: '14px',
    color: '#333',
    marginBottom: '15px',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: '20px',
  },
  confirmButton: {
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

export default function PharmacistDashboard() {
  const classes = useStyles();
  const { user } = useLoggedInUser(); // Get logged-in user information
  const [rows, setRows] = useState([]);
  const prescribed = usePrescribedDrugs("prescribed/all");
  const issued = usePrescribedDrugs("dispensingreport");
  const cancelled = usePrescribedDrugs("dispensingreport/cancelled");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const base = useBaseUrl();
    // Add after other state declarations
  const [patients, setPatients] = useState({});
  
  // New state variables for removal confirmation
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [drugToRemove, setDrugToRemove] = useState(null);

    // Add the fetchPatientDetails function
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
      toast.error("Error loading patient details");
    }
  };

  const searchPrescription = (e) => {
    e.preventDefault();
    if (search != "") {
      setRows([]);
      fetch(`${base}/KNH/patient/drugs/dispensingreport`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Found") {
              setRows(data.data.filter((item) => item.patient_id == search));
          }
          else{
              console.log("no data");
          }
      });
    }
  };

    const getAllPrescriptions = () => {
    fetch(`${base}/KNH/patient/drugs/dispensingreport`)
      .then(response => response.json())
      .then((data) => {
        if (data.message == "Found") {
          setRows(data.data);
          // Fetch patient details for all prescriptions
          const patientIds = data.data.map(item => item.patient_id);
          fetchPatientDetails(patientIds);
        } else {
          console.log("no data");
        }
      });
  };
  
  // Handler for showing the confirmation dialog
  const handleRemoveClick = (drug) => {
    setDrugToRemove(drug);
    setShowConfirmation(true);
  };
  
  // Handler for confirming removal
  const handleConfirmRemove = () => {
    if (drugToRemove) {
      setLoading(true);
      fetch(`${base}/KNH/patient/drugs/cancel?drug_id=${drugToRemove._id}`)
        .then(response => response.json())
        .then((data) => {
            if (data.message == "Updated Successfully") {
              toast.success(`Drug ${drugToRemove.drug} removed successfully`);
              setRows([]);
              getAllPrescriptions();
            }
            else {
              toast.error("Failed to remove drug");
              console.log("no data");
            }
            setLoading(false);
        })
        .catch(error => {
          toast.error("Error removing drug");
          console.error(error);
          setLoading(false);
        });
    }
    setShowConfirmation(false);
    setDrugToRemove(null);
  };
  
  // Handler for canceling removal
  const handleCancelRemove = () => {
    setShowConfirmation(false);
    setDrugToRemove(null);
  };

   useEffect(() => {
    setLoading(true);
    fetch(`${base}/KNH/patient/drugs/dispensingreport`)
      .then(response => response.json())
      .then((data) => {
        if (data.message == "Found") {
          setRows(data.data);
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
    <div>
      <ToastContainer />
      
      {/* Confirmation Dialog */}
      {showConfirmation && drugToRemove && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <div style={modalStyles.title}>
              Confirm Prescription Removal
            </div>
            <div style={modalStyles.message}>
              Are you sure you want to remove this prescription?
            </div>
            <div style={modalStyles.userInfo}>
              Action by: <strong>{user.firstname} {user.lastname}</strong> ({user.qualification})
            </div>
            <div style={modalStyles.details}>
              <div><strong>Drug:</strong> {drugToRemove.drug}</div>
              <div><strong>Patient ID:</strong> {drugToRemove.patient_id}</div>
              <div><strong>Prescription ID:</strong> {drugToRemove._id}</div>
              <div><strong>Usage:</strong> {drugToRemove.usage_per_day}</div>
              <div><strong>Staff ID:</strong> {user.national_id}</div>
            </div>
            <div style={modalStyles.buttonContainer}>
              <button 
                style={modalStyles.confirmButton}
                onClick={handleConfirmRemove}
                onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
              >
                Remove
              </button>
              <button 
                style={modalStyles.cancelButton}
                onClick={handleCancelRemove}
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
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon><MedicalServicesIcon /></Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Drugs Dispensed</p>
              <h3 className={classes.cardTitle}>
              {issued > 0 ? issued : 0} <small></small>
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
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <PendingActionsIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Prescribed Dispensed</p>
              <h3 className={classes.cardTitle}>{prescribed > 0 ? prescribed : 0}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <BlockIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Cancelled Prescriptions</p>
              <h3 className={classes.cardTitle}>{cancelled > 0 ? cancelled : 0}</h3>
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
              <h4 className={classes.cardTitleWhite}>Dispensed Drugs</h4>
              <p className={classes.cardCategoryWhite}>
                All Dispensed Drugs since 20th February, 2025
              </p>
            </CardHeader>
            <CardBody>
              <div className="searchOut">
                <div className="searchCont">
                  <input 
                    type="text" 
                    className="searchInput" 
                    placeholder="Search Patient ID" 
                    onChange={(e) => {
                      if (e.target.value === "") {
                        getAllPrescriptions();
                      }
                      else {
                        setSearch(e.target.value);
                        setRows(rows.filter((item) => item.patient_id == e.target.value));
                      }
                    }}
                  />
                  <button className="btnSearch" onClick={searchPrescription}>Search</button>
                </div>
              </div>
              {!loading ? 
              <>
              {rows.length > 0 ? 
                            <table className="styled-table">
                <thead>
                  <tr style={{marginBottom: "20px"}}>
                    <th>Prescription ID</th>
                    <th>Treatment ID</th>
                    <th>Patient ID</th>
                    <th>Patient Name</th>
                    <th>Drug</th>
                    <th>Usage</th>
                    <th>Notes</th>
                    <th style={{textAlign: "center"}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length > 0 ? rows.map((item) => (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.treatment_id}</td>
                      <td>{item.patient_id}</td>
                      <td>
                        {patients[item.patient_id] ? 
                          `${patients[item.patient_id].firstname} ${patients[item.patient_id].lastname}` : 
                          'Loading...'}
                      </td>
                      <td>{item.drug}</td>
                      <td>{item.usage_per_day}</td>
                      <td>{item.notes}</td>
                      <td style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <div className="editContainer">
                          <p 
                            className="editP" 
                            style={{backgroundColor: "#11b8cc"}}
                            onClick={() => handleRemoveClick(item)}
                          >
                            Remove
                          </p>
                        </div>
                      </td>
                    </tr>
                  )) : null}
                </tbody>
              </table>
              : 
              <div className="noData">
                <p className="txtNo">No Dispensed Drugs</p>
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