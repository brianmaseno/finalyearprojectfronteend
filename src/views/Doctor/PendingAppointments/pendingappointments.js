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
import { useDataStatus } from "hooks/useDataStatus";
import { useAuth } from "hooks/AuthProvider";

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

export default function DoctorPendingAppointments() {
  const classes = useStyles();
  const [pending, setPending] = useState([])
  const { loading } = useDataStatus(pending);
  const { currentUser } = useAuth();
  const [search, setSearch] = useState("")

  const searchAppointment = (e) => {
    e.preventDefault()
    setPending(pending.filter((item) => item.patient_id == search))
  }

  const getAllPendingAppointments = () => {
    fetch(`https://ehrsystembackend.herokuapp.com/KNH/appointments/doctor/pending?doctor_id=${currentUser.national_id}`)
    .then(response => response.json())
    .then((data) => {
        if (data.message == "Found") {
            setPending(data.data)
        }
        else{
            console.log("no Patient");
        }
    })
  }

  useEffect(() => {
    fetch(`https://ehrsystembackend.herokuapp.com/KNH/appointments/doctor/pending?doctor_id=${currentUser.national_id}`)
          .then(response => response.json())
          .then((data) => {
              if (data.message == "Found") {
                  setPending(data.data);
                  console.log(data.data)
              }
              else{
                  console.log("no data");
              }
          })
  }, [])

  console.log(currentUser.national_id)

  return (
    <div>
      <div className="pathCont">
        <div className="path">
            <p className="pathName">Dashboard / <span>Pending Appointments</span></p>
        </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Pending Appointments</h4>
            <p className={classes.cardCategoryWhite}>
              Appointments
            </p>
          </CardHeader>
          <CardBody>
            <div className="searchOut">
                  <div className="searchCont">
                    <input type="text" className="searchInput" placeholder="Search Appointment By Patient ID" onChange={(e) => {
                      if (e.target.value === "") {
                        getAllPendingAppointments()
                      }
                      else{
                        setSearch(e.target.value)
                        setPending(pending.filter((item) => item.patient_id == e.target.value))
                      }
                    }}/>
                    <button className="btnSearch" onClick={searchAppointment}>Search</button>
                  </div>
                </div>
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
                        <tr>
                          <td>{item._id}</td>
                          <td>{item.appointment_due_date}</td>
                          <td>{item.patient_id}</td>
                          <td>{item.doctor_id}</td>
                          <td>{item.department_id}</td>
                          <td>
                            <div className="editContainer">
                              <p className="editP" style={{backgroundColor: "green"}} onClick={() => {
                                fetch(`https://ehrsystembackend.herokuapp.com/KNH/appointments/approve?appointment_id=${item.appointment_id}`)
                                .then(response => response.json())
                                .then((data) => {
                                    if (data.message == "Appointment Approved Successfully") {
                                      console.log("Approved")
                                    }
                                    else{
                                      console.log("Not Approved")
                                    }
                                })
                                }}>Approve</p>
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
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  </div>
  );
}
