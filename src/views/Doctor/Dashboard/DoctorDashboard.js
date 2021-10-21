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

const useStyles = makeStyles(styles);

export default function DoctorDashboard() {
  const classes = useStyles();
  const [rows, setRows] = useState([])
  const [pending, setPending] = useState([])
  const [approved, setApproved] = useState([])
  const [blocked, setBlocked] = useState([])
  const { loading } = useDataStatus(rows);

  useEffect(() => {
    fetch("https://ehrsystembackend.herokuapp.com/KNH/staff/all")
          .then(response => response.json())
          .then((data) => {
              if (data.message == "Found") {
                  setRows(data.data);
                  setPending(rows.filter((row) => (row.status == "pending")));
                  setApproved(rows.filter((row) => (row.status == "activated")));
                  setBlocked(rows.filter((row) => (row.status == "suspended")));
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
                {rows ? rows.length : 0} <small></small>
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
              <h3 className={classes.cardTitle}>{pending ? pending.length : 0}</h3>
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
              <p className={classes.cardCategory}>Complete Appointments</p>
              <h3 className={classes.cardTitle}>{blocked ? blocked.length : 0}</h3>
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
              <h3 className={classes.cardTitle}>{approved ? approved.length : 0}</h3>
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
                  <input type="text" className="searchInput" placeholder="Search Appointment"/>
                  <button className="btnSearch">Search</button>
                </div>
              </div>
              {loading ?
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
                  {rows ? rows.map((item) => (
                      <tr>
                        <td>{item._id}</td>
                        <td>{item.firstname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.username}</td>
                        <td>{item.qualification}</td>
                        <td>{item.status}</td>
                        <td>
                          <div className="editContainer">
                            <p className="editP" style={{backgroundColor: "green"}} onClick={() => {
                              fetch(`https://ehrsystembackend.herokuapp.com/KNH/staff/suspend?username=${item.username}`)
                              .then(response => response.json())
                              .then((data) => {
                                  if (data.message == "Suspended") {
                                    toast.success("Account Suspended");
                                    setUpdated(true);
                                    console.log("Suspended")
                                  }
                                  else{
                                    toast.error("Account Not Suspended");
                                    setUpdated(false)
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
