
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
  },
  readOnlyField: {
    backgroundColor: "#f5f5f5",
    color: "#666",
    cursor: "not-allowed"
  },
  formRow: {
    display: "flex",
    flexWrap: "wrap",
    margin: "0 -10px",
    alignItems: "flex-start"
  },
  formField: {
    flex: "1 0 200px",
    padding: "0 10px",
    marginBottom: "15px"
  }
};

const useStyles = makeStyles(styles);

export default function DoctorAvailability() {
  const classes = useStyles();
  const { user } = useLoggedInUser();

  const [date, setDate] = useState("");
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("");
  const [slots, setSlots] = useState("");
  const [loading, setLoading] = useState(false);
  const base = useBaseUrl();

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
      
      /* Remove spinner arrows from number inputs */
      input[type="number"]::-webkit-outer-spin-button,
      input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      
      /* Firefox */
      input[type="number"] {
        -moz-appearance: textfield;
      }
      
      /* Form layout */
      .form-container {
        max-width: 100%;
      }
      
      .inCase {
        width: 100%;
        height: 38px;
        padding: 8px 12px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      
      .idC {
        display: block;
        margin-bottom: 5px;
        font-weight: 500;
      }
      
      .form-row {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -10px;
      }
      
      .form-field {
        flex: 1 1 200px;
        padding: 0 10px;
        margin-bottom: 15px;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Get today's date in YYYY-MM-DD format for the date input
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Handle date input change with validation
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of day for accurate comparison
    
    if (selectedDate >= today) {
      setDate(e.target.value);
    } else {
      toast.error("Cannot select a past date");
      setDate(""); // Clear invalid date
    }
  };

  // Validate slots to ensure positive integers only
  const handleSlotsChange = (e) => {
    const value = e.target.value;
    // Only allow positive integers
    if (value === "" || /^[1-9]\d*$/.test(value)) {
      setSlots(value);
    }
  };

  const addAvailability = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!date || !from || !to || !slots) {
      toast.error("All fields are required");
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

    // Basic time validation
    const fromTime = new Date(`2000-01-01T${from}`);
    const toTime = new Date(`2000-01-01T${to}`);
    
    if (fromTime >= toTime) {
      toast.error("End time must be after start time");
      return;
    }

    setLoading(true);

    const details = {
      date: date,
      doctor_id: user.national_id,
      fromTime: from,
      toTime: to,
      slots: slots
    }

    axios({
      method: 'post',
      url: `${base}/KNH/appointments/doctor/availability`,
      data: details})
      .then((data) => {
        console.log(data.data)
          if (data.data.message === "Availability Placed Successfully") {
              console.log("inserted")
              setLoading(false);
              toast.success("Availability details added");
              
              // Reset form fields except doctor ID
              setDate("");
              setFrom("");
              setTo("");
              setSlots("");
          }
          else{
            setLoading(false);
            console.log("Not Inserted")
            toast.error(data.data.message || "Availability not added");
          }                
      })
      .catch((error) => {
          setLoading(false);
          console.log(error);
          toast.error("Error adding availability");
    });
  }

  return (
    <>
    <ToastContainer />
    <div className="pathCont">
        <div className="path">
            <p className="pathName">Dashboard / <span>Doctor Availability</span></p>
        </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Add Availability</h4>
            <p className={classes.cardCategoryWhite}>
              Availability
            </p>
          </CardHeader>
          <CardBody>
            <div className="caseOuter">
                <div className="caseContainer form-container">
                  <div className="form-row">
                    <div className="form-field">
                      <label className="idC">Doctor ID*</label>
                      <input 
                        placeholder="Doctor ID" 
                        className={`inCase ${classes.readOnlyField}`} 
                        value={user.national_id}
                        readOnly
                      />
                    </div>
                    <div className="form-field">
                      <label className="idC">Date*</label>
                      <div className={classes.dateInput}>
                        <input 
                          type="date" 
                          className="inCase date-input" 
                          min={getTodayDate()}
                          value={date}
                          onChange={handleDateChange}
                          onKeyDown={(e) => e.preventDefault()} // Prevent manual entry
                        />
                      </div>
                    </div>
                    <div className="form-field">
                      <label className="idC">From*</label>
                      <input 
                        type="time" 
                        placeholder="From" 
                        className="inCase" 
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                      />
                    </div>
                    <div className="form-field">
                      <label className="idC">To*</label>
                      <input 
                        type="time" 
                        placeholder="To" 
                        className="inCase" 
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                      />
                    </div>
                    <div className="form-field">
                      <label className="idC">Slots*</label>
                      <input 
                        type="text" 
                        placeholder="Enter number of slots" 
                        className="inCase" 
                        value={slots}
                        onChange={handleSlotsChange}
                        onKeyPress={(e) => {
                          // Allow only numbers
                          if (!/[1-9\d]/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="caseFooter">
                    {!loading ? (
                      <button 
                        className="caseSave" 
                        onClick={addAvailability}
                        disabled={!date || !from || !to || !slots}
                      >
                        Add Availability
                      </button>
                    ) : (
                      <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/>
                    )} 
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