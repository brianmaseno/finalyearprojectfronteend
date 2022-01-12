/* eslint-disable */
import React, {useEffect, useState} from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import DateRange from "@material-ui/icons/DateRange";
import Update from "@material-ui/icons/Update";
import QuizIcon from '@mui/icons-material/Quiz';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ScienceIcon from '@mui/icons-material/Science';
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
import { useLab } from "hooks/useLab";
import { usePendingLab } from "hooks/usePendingLab";
import ProjectLoading from "components/Loading/projectloading";
import { useBaseUrl } from "hooks/useBaseUrl";

const useStyles = makeStyles(styles);

export default function LabDashboard() {
  const classes = useStyles();
  const [rows, setRows] = useState([])
  const { lab } = useLab()
  const { pending } = usePendingLab()
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false);
  const base = useBaseUrl()

  const searchTests = (e) => {
    e.preventDefault()
    if (search != "") {
      setRows([]);
      fetch(`${base}/KNH/patient/lab/tests/report`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Report Found") {
              setRows(data.data.filter((item) => item.patient_id == search));
          }
          else{
              console.log("no data");
          }
      })
    }
  }

  const getAllTests = () => {
    fetch(`${base}/KNH/patient/lab/tests/report`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Report Found") {
              setRows(data.data);
          }
          else{
              console.log("no data");
          }
      })
  }

  useEffect(() => {
    setLoading(true);
    fetch(`${base}/KNH/patient/lab/tests/report`)
          .then(response => response.json())
          .then((data) => {
              if (data.message == "Report Found") {
                  setRows(data.data);
                  setLoading(false);
              }
              else{
                  console.log("no data");
                  setLoading(false);
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
                <Icon><ScienceIcon /></Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total Lab Tests</p>
              <h3 className={classes.cardTitle}>
                {pending + lab.length > 0 ? pending + lab.length : 0} <small></small>
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
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon><QuizIcon /></Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Pending Requests</p>
              <h3 className={classes.cardTitle}>{pending ? pending : 0}</h3>
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
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <CheckCircleOutlineIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Completed Tests</p>
              <h3 className={classes.cardTitle}>{lab ? lab.length : 0}</h3>
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
              <h4 className={classes.cardTitleWhite}>Completed Tests</h4>
              <p className={classes.cardCategoryWhite}>
                Tests done since 10th October, 2021
              </p>
            </CardHeader>
            <CardBody>
            <div className="searchOut">
                <div className="searchCont">
                  <input type="text" className="searchInput" placeholder="Search Test By ID" onChange={(e) => {
                    if (e.target.value === "") {
                      getAllTests()
                    }
                    else{
                      setSearch(e.target.value)
                      setRows(rows.filter((item) => item.patient_id == e.target.value))
                    }
                  }}/>
                  <button className="btnSearch" onClick={searchTests}>Search</button>
                </div>
              </div>
              {!loading ? 
              <>
              {rows.length > 0 ? 
              <Table
                tableHeaderColor="info"
                tableHead={["Test ID", "Test Name", "Patient ID", "Test Date", "Test Cost (Ksh)"]}
                tableData={rows.map((item) => ([item.lab_test_id, item.test_name, item.patient_id, item.lab_test_date, item.test_cost]))}
              />
              :
              <div className="noData">
                <p className="txtNo">No Completed Tests</p>
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
