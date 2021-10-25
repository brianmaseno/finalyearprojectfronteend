/* eslint-disable */
import React, {useState, useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useAuth } from "hooks/AuthProvider";
const axios = require('axios').default;

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

export default function BookAppointment() {
  const classes = useStyles();
  const [date, setDate] = useState("");
  const [clinicians, setClinicians] = useState("");
  const { currentUser } = useAuth();

  const [patientId, setPatientId] = useState("");
  const [clinicianId, setClinicianId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [reason, setReason] = useState("");

  const check = (e) => {
    e.preventDefault();

    const status = date === "";

    if (!status) {
      axios.get(`https://ehrsystembackend.herokuapp.com/KNH/appointments/slots/available/date?date=${date}`)
      .then((data) => {
          if (data.data.message == "Found") {
            setClinicians(data.data.data)
            console.log(data.data.data)
          }
          else{
            console.log("Not Found")
          }                
      })
      .catch((error) => {
          console.log(error);
      });
    }
    else{
      console.log("Parameter Missing")
    }

  }

  const saveAppointment = (e) => {
    e.preventDefault();
    const currDate = new Date();
    const newDate = currDate.getDate() + "/" + currDate.getMonth() + "/" + currDate.getFullYear();

    const details = {
      patient_id: patientId,
      doctor_id: clinicianId,
      date: appointmentDate,
      appointment_reason: reason,
      appointment_due_date: date,
      appointment_created_date: newDate,
      department_id: currentUser.department_id
  }


  axios({
      method: 'post',
      url: 'https://ehrsystembackend.herokuapp.com/KNH/appointments/add',
      data: details})
      .then((data) => {
          if (data.data.message == "Appointment Placed Successfully") {
              console.log("inserted")
          }
          else{
              console.log("Not Inserted")
          }                
      })
      .catch((error) => {
          console.log(error);
  });
  }

  return (
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
                        <input type="date" className="patText" onChange={(e) => setDate(e.target.value)}/>
                    </div>
                    <div className="checkAv">
                        <button className="btnPay" onClick={check}>Check Availability</button>
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
                                <input type="text" placeholder="Patient ID" className="patInput" onChange={(e) => setPatientId(e.target.value)}/>
                              </div>
                            </div>
                            <div className="formCont">
                              <div className="formIn">
                                <label className="labelPat">Clinician</label>
                                <select type="text" className="patInput" style={{width: "100%"}} onChange={(e) => setClinicianId(e.target.value)}>
                                  <option>Select...</option>
                                  {clinicians.length > 0 ? clinicians.map((item) => (
                                    <option value={item.doctor_id}>{item.doctor_id}</option>
                                  ))
                                  :
                                  <option>Select...</option>
                                }
                                </select>
                              </div>
                            </div>
                            <div className="formCont">
                              <div className="formIn">
                                <label className="labelPat">Date</label>
                                <input type="date" placeholder="Date" className="patInput" onChange={(e) => setAppointmentDate(e.target.value)}/>
                              </div>
                            </div>
                            <div className="formCont">
                              <div className="formIn">
                                <label className="labelPat">Reason</label>
                                <textarea className="patInput" onChange={(e) => setReason(e.target.value)}>

                                </textarea>
                              </div>
                            </div>
                            <div className="formBtn">
                                <button className="btnUpdate" onClick={saveAppointment}>Save Appointment</button>
                                <button className="btnDelete">Cancel</button>
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
  );
}
