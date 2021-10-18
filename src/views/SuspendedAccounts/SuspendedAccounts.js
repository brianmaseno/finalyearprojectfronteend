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
import './suspend.css';
import { useBaseUrl } from "hooks/useBaseUrl";

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

const useStyles = makeStyles(styles);

export default function SuspendedAccounts() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const base = useBaseUrl();
  
  // State variables for restoration confirmation
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [accountToRestore, setAccountToRestore] = useState(null);

  const searchStaff = (e) => {
    e.preventDefault();
    if (search != "") {
      setData([]);
      fetch(`${base}/KNH/staff/accounts/suspended`)
        .then(response => response.json())
        .then((data) => {
            if (data.message == "Found") {
                setData(data.data.filter((item) => item.national_id == search));
            }
            else{
                console.log("no data");
            }
        });
    }
  };

  const getAllSuspendedStaff = () => {
    fetch(`${base}/KNH/staff/accounts/suspended`)
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
  
  // Handler for showing confirmation dialog
  const handleRestoreClick = (account) => {
    setAccountToRestore(account);
    setShowConfirmation(true);
  };
  
  // Handler for confirming restoration
  const handleConfirmRestore = () => {
    if (accountToRestore) {
      fetch(`${base}/KNH/staff/activate?username=${accountToRestore.username}`)
        .then(response => response.json())
        .then((data) => {
          if (data.message === "Activated") {
            toast.success("Account Activated Successfully");
            setData([]);
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              getAllSuspendedStaff();
            }, 1000);
          } else {
            toast.error("Account Activation Failed");
          }
        })
        .catch(error => {
          console.error("Error activating account:", error);
          toast.error("Error activating account");
        });
    }
    setShowConfirmation(false);
    setAccountToRestore(null);
  };
  
  // Handler for canceling restoration
  const handleCancelRestore = () => {
    setShowConfirmation(false);
    setAccountToRestore(null);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${base}/KNH/staff/accounts/suspended`)
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
    {showConfirmation && accountToRestore && (
      <div style={modalStyles.overlay}>
        <div style={modalStyles.modal}>
          <div style={modalStyles.title}>
            Confirm Account Restoration
          </div>
          <div style={modalStyles.message}>
            Are you sure you want to restore this employee's account access?
          </div>
          <div style={modalStyles.details}>
            <div><strong>ID:</strong> {accountToRestore.national_id}</div>
            <div><strong>Name:</strong> {accountToRestore.firstname} {accountToRestore.lastname}</div>
            <div><strong>Username:</strong> {accountToRestore.username}</div>
            <div><strong>Qualification:</strong> {accountToRestore.qualification}</div>
            <div><strong>Current Status:</strong> {accountToRestore.status}</div>
          </div>
          <div style={modalStyles.buttonContainer}>
            <button 
              style={modalStyles.confirmButton}
              onClick={handleConfirmRestore}
              onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
            >
              Restore
            </button>
            <button 
              style={modalStyles.cancelButton}
              onClick={handleCancelRestore}
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
        <p className="pathName">Dashboard / <span>Suspended Accounts</span></p>
      </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>All Suspended Employees Accounts</h4>
            <p className={classes.cardCategoryWhite}>
              All Suspended Accounts details
            </p>
          </CardHeader>
          <CardBody>
            <div className="searchOut">
              <div className="searchCont">
                <input 
                  type="text" 
                  className="searchInput" 
                  placeholder="Search Employee By ID" 
                  onChange={(e) => {
                    if (e.target.value === "") {
                      getAllSuspendedStaff();
                    }
                    else{
                      setSearch(e.target.value);
                      setData(data.filter((item) => item.national_id == e.target.value));
                    }
                  }}
                />
                <button className="btnSearch" onClick={searchStaff}>Search</button>
              </div>
            </div>
            {!loading ? 
            <>
            {data.length > 0 ? 
            <table className="styled-table">
              <thead>
                <tr style={{marginBottom: "20px"}}>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                  <th>Qualification</th>
                  <th>Status</th>
                  <th style={{textAlign: "center"}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? data.map((item) => (
                    <tr key={item.national_id}>
                      <td>{item.national_id}</td>
                      <td>{item.firstname}</td>
                      <td>{item.lastname}</td>
                      <td>{item.username}</td>
                      <td>{item.qualification}</td>
                      <td>{item.status}</td>
                      <td style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <div className="editContainer">
                          <p 
                            className="editP" 
                            style={{backgroundColor: "#11b8cc"}} 
                            onClick={() => handleRestoreClick(item)}
                          >
                            Restore
                          </p>
                        </div>
                      </td>
                  </tr>
                )) : null}
              </tbody>
            </table>
            :  
            <div className="noData">
              <p className="txtNo">No Suspended Accounts</p>
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