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
import { useAccountStatus } from "hooks/useAccountStatus";
import { useDataStatus } from "hooks/useDataStatus";
import { ToastContainer, toast } from "react-toastify";
import ReactLoading from 'react-loading';
import { usePatients } from "hooks/usePatients";
import { useAppointments } from "hooks/useAppointments";

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

export default function ApprovedAppointments() {
  const classes = useStyles();
  const [approved, setApproved] = useState([])
  const [search, setSearch] = useState("")

  const searchApproved = (e) => {
    e.preventDefault()
    setApproved(approved.filter((item) => item.patient_id === search))
    console.log(approved)
  }
  
  const getApprovedAppointments = () => {
    fetch("https://ehrsystembackend.herokuapp.com/KNH/appointments/all/activated")
    .then(response => response.json())
    .then((data) => {
        if (data.message === "Found") {
            setApproved(data.data)
        }
        else{
            console.log("no Appointment");
        }
    })
  }

  useEffect(() => {
    fetch("https://ehrsystembackend.herokuapp.com/KNH/appointments/all/activated")
      .then(response => response.json())
      .then((data) => {
          if (data.message === "Found") {
            setApproved(data.data)
          }
          else{
            console.log("Not Found")
          }
      })
  }, [])

  return (
    <>
    <ToastContainer />
    <div className="pathCont">
      <div className="path">
        <p className="pathName">Dashboard / <span>Approved Appointments</span></p>
      </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>All Approved Appointments</h4>
            <p className={classes.cardCategoryWhite}>
              Approved Appointments details
            </p>
          </CardHeader>
          <CardBody>
          <div className="searchOut">
              <div className="searchCont">
                <input type="text" className="searchInput" placeholder="Search Appointment By ID" onChange={(e) => {
                  if (e.target.value === "") {
                    getApprovedAppointments()
                  }
                  else{
                    setSearch(e.target.value)
                    setApproved(approved.filter((item) => item.patient_id === e.target.value))
                  }
                }}/>
                <button className="btnSearch" onClick={searchApproved}>Search</button>
              </div>
              </div>
              <table className="styled-table">
                <thead>
                  <tr style={{marginBottom: "20px"}}>
                    <th>Appointment ID</th>
                    <th>Appointment Date</th>
                    <th>Patient ID</th>
                    <th>Clinician ID</th>
                    <th>Department ID</th>
                    <th style={{textAlign: "center"}}>Status</th>
                  </tr>
                </thead>
                <tbody>
                {approved.length > 0 ? approved.map((item) => (
                      <tr>
                        <td>{item._id}</td>
                        <td>{item.appointment_due_date}</td>
                        <td>{item.patient_id}</td>
                        <td>{item.doctor_id}</td>
                        <td>{item.department_id}</td>
                        <td>
                        <div className="editContainer">
                          <p className="editP" style={{backgroundColor: "#11b8cc"}}>approved</p>
                        </div>
                      </td>
                    </tr>
                    )) : null}
                </tbody>
              </table>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    </>
  );
}
