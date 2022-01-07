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
const axios = require('axios').default;
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

const useStyles = makeStyles(styles);

export default function BookAppointment() {
  const classes = useStyles();
  const [date, setDate] = useState("");
  const [clinicians, setClinicians] = useState([]);
  const { user } = useLoggedInUser();
  const [loading, setLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)

  const [patientId, setPatientId] = useState("");
  const [clinicianId, setClinicianId] = useState("");
  const [doctorId, setDoctorId] = useState("")
  const [appointmentDate, setAppointmentDate] = useState("");
  const [reason, setReason] = useState("");
  const base = useBaseUrl()

  const check = (e) => {
    e.preventDefault();

    const status = date == "";

    if (!status) {
      setLoading(true);
      axios.get(`${base}/KNH/appointments/slots/available/date?date=${date}`)
      .then((data) => {
          if (data.data.message == "Found") {
            setClinicians(data.data.data)
            console.log(data.data.data)
            setLoading(false);
            toast.success("Clinician available")
          }
          else{
            console.log("Not Found")
            setLoading(false);
            toast.error("No clinician available")
          }                
      })
      .catch((error) => {
        toast.error("No date selected");
        setLoading(false);
        console.log(error);
      });
    }
    else{
      console.log("Parameter Missing")
    }

  }

  const saveAppointment = (e) => {
    e.preventDefault();

    const check = clinicianId == "" || patientId == "" || appointmentDate == "" || reason == "";

    if (check) {
      toast.error("Parameter Missing")
    }
    else {
      setSaveLoading(true);
      const currDate = new Date();
      const newDate = currDate.getDate() + "/" + currDate.getMonth() + "/" + currDate.getFullYear();

      if (clinicianId !== "") {
        let finL;
        for (let index = 0; index < clinicians.length; index++) {
          if (clinicians[index]._id === clinicianId) {
            finL = clinicians[index].doctor_id;
          }
          else{
            console.log("Not Found")
          }
          
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
      }
  
      axios({
          method: 'post',
          url: `${base}/KNH/appointments/add`,
          data: details})
          .then((data) => {
              if (data.data.message == "Appointment Placed Successfully") {
                  console.log("inserted")
                  setSaveLoading(false);
                  toast.success("Appointment booked successfully")
    
                  //notification
                  const message = `New appointment for ${patientId} needs approval`;
                  fetch(`${base}/KNH/staff/addNotification?message=${message}&&sender_id=${user.national_id}&&category=${user.qualification}&&receiver_id=${clinicianId}`)
                    .then(response => response.json())
                    .then((data) => {
                        console.log(data);
                    })
              }
              else{
                setSaveLoading(false);
                console.log("Not Inserted")
                toast.error("Appointment not booked")
              }                
          })
          .catch((error) => {
              console.log(error);
      });
    }
  }
}

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
                                    <option value={item._id}>{item.doctor_id}</option>
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
                                {!saveLoading ? <button className="btnUpdate" onClick={saveAppointment}>Save Appointment</button>
                                :
                                <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/>
                                }
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
