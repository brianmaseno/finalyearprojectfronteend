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

export default function DispensedDrugs() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const base = useBaseUrl();
  
  // New state variables for confirmation dialog
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState(null);

  const searchPrescription = (e) => {
    e.preventDefault();
    if (search != "") {
      setData([]);
      fetch(`${base}/KNH/patient/drugs/dispensingreport`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Found") {
              setData(data.data.filter((item) => item.patient_id == search));
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
              setData(data.data);
          }
          else{
              console.log("no data");
          }
      });
  };
  
  // Handler for showing the confirmation dialog
  const handleRemoveClick = (drug) => {
    setSelectedDrug(drug);
    setShowConfirmation(true);
  };
  
  // Handler for confirming removal
  const handleConfirmRemove = () => {
    if (selectedDrug) {
      fetch(`${base}/KNH/patient/drugs/cancel?drug_id=${selectedDrug._id}`)
        .then(response => response.json())
        .then((data) => {
            if (data.message == "Updated Successfully") {
              toast.success("Removed Successfully");
              setLoading(true);
              setTimeout(() => {
                setData([]);
                setLoading(false);
                getAllPrescriptions();
              }, 2000);
            }
            else{
              toast.error("Not Removed");
            }
        })
        .catch(error => {
          toast.error("Error removing drug");
          console.error(error);
        });
    }
    setShowConfirmation(false);
    setSelectedDrug(null);
  };
  
  // Handler for canceling removal
  const handleCancelRemove = () => {
    setShowConfirmation(false);
    setSelectedDrug(null);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${base}/KNH/patient/drugs/dispensingreport`)
          .then(response => response.json())
          .then((data) => {
              if (data.message == "Found") {
                  setData(data.data);
                  setLoading(false);
              }
              else{
                  console.log("no data");
                  setLoading(false);
              }
          });
  }, []);

  return (
    <>
    <ToastContainer />
    
    {/* Confirmation Dialog */}
    {showConfirmation && (
      <div style={modalStyles.overlay}>
        <div style={modalStyles.modal}>
          <div style={modalStyles.title}>
            Confirm Removal
          </div>
          <div style={modalStyles.message}>
            Are you sure you want to remove {selectedDrug && selectedDrug.drug} prescribed to patient {selectedDrug && selectedDrug.patient_id}?
          </div>
          <div style={modalStyles.buttonContainer}>
            <button 
              style={modalStyles.confirmButton}
              onClick={handleConfirmRemove}
              onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
            >
              Yes, Remove
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
    
    <div className="pathCont">
      <div className="path">
        <p className="pathName">Dashboard / <span>Dispensed Drugs</span></p>
      </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>All Dispensed Drugs</h4>
            <p className={classes.cardCategoryWhite}>
              Drugs
            </p>
          </CardHeader>
          <CardBody>
            <div className="searchOut">
              <div className="searchCont">
                <input type="text" className="searchInput" placeholder="Search Patient ID" onChange={(e) => {
                  if (e.target.value === "") {
                    getAllPrescriptions();
                  }
                  else{
                    setSearch(e.target.value);
                    setData(data.filter((item) => item.patient_id == e.target.value));
                  }
                }}/>
                <button className="btnSearch" onClick={searchPrescription}>Search</button>
              </div>
            </div>
            {!loading ? 
            <>
            {data.length > 0 ? 
            <table className="styled-table">
              <thead>
                <tr style={{marginBottom: "20px"}}>
                  <th>Prescription ID</th>
                  <th>Treatment ID</th>
                  <th>Patient ID</th>
                  <th>Drug</th>
                  <th>Usage</th>
                  <th>Notes</th>
                  <th style={{textAlign: "center"}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? data.map((item) => (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.treatment_id}</td>
                      <td>{item.patient_id}</td>
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
            <p className="txtNo">No Drug</p>
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