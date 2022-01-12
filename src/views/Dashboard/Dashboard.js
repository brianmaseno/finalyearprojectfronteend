/* eslint-disable */
import React, {useEffect, useState} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import BlockIcon from '@material-ui/icons/Block';
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
import PeopleIcon from '@mui/icons-material/People';
import PendingIcon from '@mui/icons-material/Pending';
import GppGoodIcon from '@mui/icons-material/GppGood';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
//import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { useStatus } from "hooks/useStatus";
import ProjectLoading from "components/Loading/projectloading";
import { useBaseUrl } from "hooks/useBaseUrl";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const [rows, setRows] = useState([])
  const pending = useStatus("pending");
  const approved = useStatus("activated");
  const blocked = useStatus("suspended");
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false);
  const base = useBaseUrl()

  const searchStaff = (e) => {
    e.preventDefault()

    if (search != "") {
      setRows([]);
      fetch(`${base}/KNH/staff/all`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Found") {
            setRows(data.data.filter((item) => item.national_id == search));
          }
          else{
            console.log("Not Found")
          }
      })
    }    
  }

  const getAllStaff = () => {
    fetch(`${base}/KNH/staff/all`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Found") {
            setRows(data.data)
          }
          else{
            console.log("Not Found")
          }
      })
  }

  useEffect(() => {
    setLoading(true)
    fetch(`${base}/KNH/staff/all`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Found") {
            setRows(data.data)
            setLoading(false);
          }
          else{
            console.log("Not Found")
            setLoading(false);
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
                <Icon><PeopleIcon /></Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total Employees</p>
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
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <PendingIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Pending Accounts</p>
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
                <Icon><BlockIcon /></Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Blocked Accounts</p>
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
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <GppGoodIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Activated Accounts</p>
              <h3 className={classes.cardTitle}>{approved ? approved.length : 0}</h3>
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
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                All employees since 10th October, 2021
              </p>
            </CardHeader>
            <CardBody>
              <div className="searchOut">
                <div className="searchCont">
                  <input type="text" className="searchInput" placeholder="Search Employee By ID" onChange={(e) => {
                    if (e.target.value == "") {
                      getAllStaff()
                    }
                    else{
                      setSearch(e.target.value)
                      setRows(rows.filter((item) => item.national_id == e.target.value))
                    }
                  }}/>
                  <button className="btnSearch" onClick={searchStaff}>Search</button>
                </div>
              </div>
              {!loading ? 
              <>
              {rows.length > 0 ? 
              <Table
                tableHeaderColor="info"
                tableHead={["ID", "First Name", "Last Name", "Qualification", "County"]}
                tableData={rows.map((item) => ([item.national_id, item.firstname, item.lastname, item.qualification, item.county]))}
              />
              :
              <div className="noData">
                <p className="txtNo">No Employee Account</p>
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
    </div>
  );
}
