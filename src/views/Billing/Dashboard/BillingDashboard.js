/* eslint-disable */
import React, {useEffect, useState} from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import DateRange from "@material-ui/icons/DateRange";
import PaidIcon from '@mui/icons-material/Paid';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentsIcon from '@mui/icons-material/Payments';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { useBilling } from "hooks/useBilling";
import ProjectLoading from "components/Loading/projectloading";
import { useBaseUrl } from "../../../hooks/useBaseUrl";

const useStyles = makeStyles(styles);

export default function BillingDashboard() {
  const classes = useStyles();
  const [rows, setRows] = useState([])
  const unpaid = useBilling("pendingbills")
  const paid = useBilling("completedbills")
  const total = unpaid + paid
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false);
  const base = useBaseUrl()

  const searchBilling = (e) => {
    e.preventDefault()
    rows.filter((item) => item.patient_id == search)
  }

  const allBillings = () => {
    fetch(`${base}/KNH/patient/billing/completedbills/report/all`)
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
  }

  useEffect(() => {
    setLoading(true);
    fetch(`${base}/KNH/patient/billing/completedbills/report/all`)
          .then(response => response.json())
          .then((data) => {
              if (data.message == "Found") {
                  setRows(data.data);
                  setLoading(false);
              }
              else{
                  console.log("no data");
                  setLoading(false)
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
                <Icon><PaidIcon /></Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total</p>
              <h3 className={classes.cardTitle}>Ksh {total > 0 ? total : 0} <small></small>
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
                <AttachMoneyIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Paid Amount</p>
              <h3 className={classes.cardTitle}>Ksh {paid > 0 ? paid : 0}</h3>
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
                <Icon><PaymentsIcon /></Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Unpaid Amount</p>
              <h3 className={classes.cardTitle}>Ksh {unpaid > 0 ? unpaid : 0}</h3>
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
              <div className="searchOut">
                <div className="searchCont">
                  <input type="text" className="searchInput" placeholder="Search Payments By ID" onChange={(e) => {
                    if (e.target.value === "") {
                      allBillings()
                    }
                    else{
                      setSearch(e.target.value)
                      rows.filter((item) => item.patient_id == e.target.value)
                    }
                  }}/>
                  <button className="btnSearch" onClick={searchBilling}>Search</button>
                </div>
              </div>
              {!loading ? 
              <>
              {rows.length > 0 ?
              <Table
                tableHeaderColor="info"
                tableHead={["Patient ID", "Service Name", "Service Cost", "Date"]}
                tableData={rows.map((item) => ([item.patient_id, item.service_name, item.service_cost, item.added_on]))}
              />
              :
              <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}><p>No Data</p></div>
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
