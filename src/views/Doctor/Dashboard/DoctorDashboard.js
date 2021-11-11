/* eslint-disable */
import React, {useEffect, useState} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
//import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
//import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
//import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { useDataStatus } from "hooks/useDataStatus";
import { useDoctorAppointments } from "hooks/useDoctorAppointments";
import { useAuth } from "hooks/AuthProvider";
import { usePatients } from "hooks/usePatients";

const useStyles = makeStyles(styles);

export default function DoctorDashboard() {
  const classes = useStyles();
  const { currentUser } = useAuth()
  const [pending, setPending] = useState([])
  const approved = useDoctorAppointments("approved", currentUser.national_id)
  const pendingData = useDoctorAppointments("pending", currentUser.national_id)
  const cancelled = useDoctorAppointments("cancelled", currentUser.national_id)
  const { patients } = usePatients()
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
              }
              else{
                  console.log("no data");
              }
          })
  }, [])
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total Appointments</p>
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
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Pending Appointments</p>
              <h3 className={classes.cardTitle}>{pendingData.data ? pendingData.data.length : 0}</h3>
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
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Cancelled Appointments</p>
              <h3 className={classes.cardTitle}>{cancelled.data ? cancelled.data.length : 0}</h3>
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
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Approved Appointments</p>
              <h3 className={classes.cardTitle}>{approved.data ? approved.data.length : 0}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Pending Appointments</h4>
              <p className={classes.cardCategoryWhite}>
                All Pending appointments since 10th October, 2021
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
                                      console.log("Not")
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
