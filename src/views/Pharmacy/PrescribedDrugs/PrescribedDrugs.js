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
import { useDrugs } from "hooks/useDrugs";
import ProjectLoading from "components/Loading/projectloading";
import { ToastContainer, toast } from "react-toastify";
import { useBaseUrl } from "hooks/useBaseUrl";
import { useLoggedInUser } from "hooks/useLoggedInUser";
import axios from 'axios';

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

// Modal styles for confirmation popup
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
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  }
};

const useStyles = makeStyles(styles);

export default function PrescribedDrugs() {
  const classes = useStyles();
  const [patientId, setPatientId] = useState("")
  const [data, setData] = useState([])
  const { user } = useLoggedInUser();
  const { drug } = useDrugs()
  const [loading, setLoading] = useState(false);
  const [disLoading, setDisLoading] = useState(false);
  const base = useBaseUrl();
  const [patientIdValid, setPatientIdValid] = useState(true);
  
  // New state variables for confirmation dialog
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [isBatchDispense, setIsBatchDispense] = useState(false);
    // Add after other state declarations
  const [patientDetails, setPatientDetails] = useState(null);

    // Add after other functions
  const fetchPatientDetails = async (patientId) => {
    try {
      const response = await fetch(`${base}/KNH/patient/CheckPatientbyId?patient_id=${patientId}`);
      const data = await response.json();
      if (data.data) {
        setPatientDetails({
          firstname: data.data[0].firstname,
          lastname: data.data[0].lastname
        });
      }
    } catch (error) {
      console.error("Error fetching patient details:", error);
      toast.error("Error loading patient details");
    }
  };


  const handlePatientIdChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8); // Only allow digits and limit to 8
    setPatientId(value);
    setPatientIdValid(/^\d{8}$/.test(value) || value === '');
  };

  // Handler for the "Dispense Drugs" button (batch dispensing)
  const handleBatchDispenseClick = () => {
    setIsBatchDispense(true);
    setConfirmationMessage(`Are you sure you want to dispense all medications for patient ${patientId}?`);
    setShowConfirmation(true);
  };

  // Handler for individual "Dispense" buttons
  const handleSingleDispenseClick = (item) => {
    setIsBatchDispense(false);
    setSelectedDrug(item);
    setConfirmationMessage(`Are you sure you want to dispense ${item.drug_name} for patient ${patientId}?`);
    setShowConfirmation(true);
  };

  // Handler for "Yes" in confirmation dialog
  const handleConfirmDispense = () => {
    if (isBatchDispense) {
      // Handle batch dispensing
      dispenseDrugs();
    } else {
      // Handle single drug dispensing
      dispenseSingleDrug();
    }
    setShowConfirmation(false);
  };

  // Handler for "No" in confirmation dialog
  const handleCancelDispense = () => {
    setShowConfirmation(false);
    setSelectedDrug(null);
    setIsBatchDispense(false);
  };

  // Function to dispense a single drug
  const dispenseSingleDrug = () => {
    if (!selectedDrug) return;
    
    const prescription_id = selectedDrug.prescription_id;
    const treatment_id = selectedDrug.treatment_id;
    const drug_id = selectedDrug.drug_id;
    
    const payDetails = {
      patient_id: patientId,
      treatment_id: treatment_id,
      service_name: "Drug Dispensation",
      service_cost: drug.filter((item) => item._id == drug_id)[0].drug_cost,
      service_department: user.department_id,
      added_by: user.national_id
    };
    
    fetch(`${base}/KNH/patient/drugs/issue?prescription_id=${prescription_id}&&drug_id=${drug_id}&&quantity=${"3"}`)
      .then(response => response.json())
      .then((data) => {
        if (data.message == "Updated Successfully") {
          console.log(data.message);
          toast.success("Drug Issued");
          
          // Notification
          const message = `${drug.filter((item) => item._id == drug_id)[0].drug_name} has been dispensed to ${patientId}`;
          fetch(`${base}/KNH/staff/addNotification?message=${message}&&sender_id=${user.national_id}&&category=${user.qualification}&&receiver_id=${user.national_id}`)
            .then(response => response.json())
            .then((data) => {
              console.log(data);
            });
          
          // Billing
          axios({
            method: 'post',
            url: `${base}/KNH/patient/billing/set`,
            data: payDetails
          })
            .then((data) => {
              if (data.data.message == "Added to Bill") {
                console.log("Added to Bill");
                checkPatient();
              } else {
                console.log("Not Added");
              }                
            })
            .catch((error) => {
              console.log(error);
            });
          
          checkPatient(); // Refresh the list
        } else {
          toast.error("Error");
        }
      });
  };

  const dispenseDrugs = () => {
    if (data.length > 0) {
      setDisLoading(true);

      for (let index = 0; index < data.length; index++) {
        const drug_id = data[index].drug_id
        const treatment_id = data[index].treatment_id
        const prescription_id = data[index].prescription_id

        const payDetails = {
          patient_id: patientId,
          treatment_id: treatment_id,
          service_name: "Drug Dispensation",
          service_cost: drug.filter((item) => item._id == drug_id)[0].drug_cost,
          service_department: user.department_id,
          added_by: user.national_id
        }

        fetch(`${base}/KNH/patient/drugs/issue?prescription_id=${prescription_id}&&drug_id=${drug_id}&&quantity=${"10"}`)
        .then(response => response.json())
        .then((data) => {
            if (data.message == "Updated Successfully") {
                setDisLoading(false);
                toast.success(`${drug.filter((item) => item._id == drug_id)[0].drug_name} Issued`);
                //notification
                const message = `${drug.filter((item) => item._id == drug_id)[0].drug_name} has been dispensed to ${patientId}`;
                fetch(`${base}/KNH/staff/addNotification?message=${message}&&sender_id=${user.national_id}&&category=${user.qualification}&&receiver_id=${user.national_id}`)
                  .then(response => response.json())
                  .then((data) => {
                      console.log(data);
                  })

                  //billing
                  axios({
                    method: 'post',
                    url: `${base}/KNH/patient/billing/set`,
                    data: payDetails})
                    .then((data) => {
                        if (data.data.message == "Added to Bill") {
                            console.log("Added to Bill")
                        }
                        else{
                            console.log("Not Added")
                        }                
                    })
                    .catch((error) => {
                        console.log(error);
                  });

                  setData([]);
            }
            else{
              setDisLoading(false);
              toast.error("Error");
            }
        })
        
      }
    }
    else{
      console.log("no id")
    }
  }

   const checkPatient = (e) => {
    if (e) e.preventDefault();
  
    if (patientId && !/^\d{8}$/.test(patientId)) {
      toast.error("Patient ID must be exactly 8 digits");
      return;
    }
    const check = patientId == "";
  
    if (check) {
      toast.error("Patient Id required")
    } else {
      setLoading(true);
      setPatientDetails(null); // Reset patient details
  
      if (!(patientId === "")) {
        // Fetch prescribed drugs
        fetch(`${base}/KNH/patient/drugs/prescribed/patient?patient_id=${patientId}`)
          .then(response => response.json())
          .then(async (data) => {
            if (data.message == "Found") {
              setData(data.data);
              await fetchPatientDetails(patientId); // Fetch patient details
              setLoading(false);
            } else {
              toast.error("No Prescribed Drugs")
              setLoading(false);
              console.log("no data");
            }
          });
      } else {
        toast.error("Error")
        setLoading(false);
        console.log("ID Missing")
      }
    }
  };

  return (
    <>
    <ToastContainer />
    
    {/* Confirmation Modal */}
    {showConfirmation && (
      <div style={modalStyles.overlay}>
        <div style={modalStyles.modal}>
          <div style={modalStyles.title}>
            Confirm Dispensing
          </div>
          <div style={modalStyles.message}>
            {confirmationMessage}
          </div>
          <div style={modalStyles.buttonContainer}>
            <button 
              style={modalStyles.confirmButton} 
              onClick={handleConfirmDispense}
              onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
            >
              Yes, Dispense
            </button>
            <button 
              style={modalStyles.cancelButton} 
              onClick={handleCancelDispense}
              onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
    
    <div className="pathCont">
      <div className="path">
        <p className="pathName">Dashboard / <span>Prescribed Drugs</span></p>
      </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Prescribed Drugs</h4>
            <p className={classes.cardCategoryWhite}>
              Drugs
            </p>
          </CardHeader>
          <CardBody>
            <div className="findContainer">
                  <div className="makeContainer">
                    <div className="titlePatient">
                        <p className="titleTxt">Check Prescribed Drugs</p>
                    </div>

                    <div className="checkBody">
                      <div className="checkAv">
                        <label className="checkAv">Patient ID* (8 digits required)</label>
                        <input 
                          placeholder="Patient ID" 
                          className="inCase"
                          onChange={handlePatientIdChange}
                          value={patientId}
                          maxLength={8}
                          pattern="\d*"
                          style={{borderColor: patientIdValid ? '' : 'red'}}
                        />
                        {!patientIdValid && patientId !== '' && (
                          <div style={{color: 'red', fontSize: '12px', marginTop: '5px'}}>
                            Patient ID must be exactly 8 digits
                          </div>
                        )}
                      </div>
                      <div className="checkAv">
                          {!loading ? <button className="btnPay" onClick={checkPatient}>Check Patient</button>
                          :
                          <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/>
                          }
                      </div>
                    </div>
                  </div>
                  <div className="patientContainer">
                    <div className="titlePatient">
                          <p className="titleTxt">Drugs Prescribed</p>
                      </div>
                      <div className="checkBody">
                        {data.length > 0 ? 
                                               <table className="styled-table">
                          <thead>
                            <tr style={{marginBottom: "20px"}}>
                              <th>Prescription ID</th>
                              <th>Patient ID</th>
                              <th>Patient Name</th>
                              <th>Drug</th>
                              <th>Usage</th>
                              <th>Notes</th>
                              <th style={{textAlign: "center"}}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((item) => (
                              <tr key={item.prescription_id}>
                                <td>{item.prescription_id}</td>
                                <td>{item.patient_id}</td>
                                <td>
                                  {patientDetails ? 
                                    `${patientDetails.firstname} ${patientDetails.lastname}` : 
                                    'Loading...'}
                                </td>
                                <td>{item.drug_name}</td>
                                <td>{item.usage}</td>
                                <td>{item.notes}</td>
                                <td>
                                  <div className="editContainer">
                                    <p 
                                      className="editP" 
                                      style={{backgroundColor: "green"}} 
                                      onClick={() => handleSingleDispenseClick(item)}
                                    >
                                      Dispense
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            ))}   
                          </tbody>
                        </table>
                        :
                        <div className="noData">
                          <p className="txtNo">No Drug</p>
                        </div>
                        }
                        
                      </div>
                      {data.length > 0 ? 
                      <div className="recContainer">
                        {!disLoading ? (
                          <button 
                            className="btnReceive" 
                            onClick={handleBatchDispenseClick}
                          >
                            Dispense Drugs
                          </button>
                        ) : (
                          <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/>
                        )}
                      </div>
                      :
                      null}
                  </div>
                </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    </>
  );
}