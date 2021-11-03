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
import { useBilling } from "hooks/useBilling";

const useStyles = makeStyles(styles);

export default function BillingDashboard() {
  const classes = useStyles();
  const [rows, setRows] = useState([])
  const unpaid = useBilling("pendingbills")
  const paid = useBilling("completedbills")
  const total = unpaid + paid

  useEffect(() => {
    fetch("https://ehrsystembackend.herokuapp.com/KNH/patient/billing/completedbills/report/all")
          .then(response => response.json())
          .then((data) => {
              if (data.message == "Found") {
                  setRows(data.data);
                  console.log(data.data)
              }
              else{
                  console.log("no data");
              }
          })
  }, [])
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total</p>
              <h3 className={classes.cardTitle}>$ 
                {total > 0 ? total : 0} <small></small>
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
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Paid Amount</p>
              <h3 className={classes.cardTitle}>$ {paid > 0 ? paid : 0}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Unpaid Amount</p>
              <h3 className={classes.cardTitle}>$ {unpaid > 0 ? unpaid : 0}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Completed Payments</h4>
              <p className={classes.cardCategoryWhite}>
                All payments since 10th October, 2021
              </p>
            </CardHeader>
            <CardBody>
              {rows.length > 0 ? 
              <>
              <div className="searchOut">
                <div className="searchCont">
                  <input type="text" className="searchInput" placeholder="Search Payments"/>
                  <button className="btnSearch">Search</button>
                </div>
              </div>
              <Table
                tableHeaderColor="warning"
                tableHead={["Patient ID", "Service Name", "Service Cost", "Date"]}
                tableData={rows.map((item) => ([item.patient_id, item.service_name, item.service_cost, item.added_on]))}
              />
              </>
              :
              <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}><p>No Data</p></div>}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
