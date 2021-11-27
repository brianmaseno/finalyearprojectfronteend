/* eslint-disable */
import React, {useEffect, useState} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
//import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { usePrescribedDrugs } from "hooks/usePrescribedDrugs";
import ProjectLoading from "components/Loading/projectloading";
import { useBaseUrl } from "hooks/useBaseUrl";
import { ToastContainer, toast } from "react-toastify";

const useStyles = makeStyles(styles);

export default function PharmacistDashboard() {
  const classes = useStyles();
  const [rows, setRows] = useState([])
  const prescribed = usePrescribedDrugs("prescribed/all")
  const issued = usePrescribedDrugs("dispensingreport")
  const cancelled = usePrescribedDrugs("dispensingreport/cancelled")
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false);
  const base = useBaseUrl()

  const searchPrescription = (e) => {
    e.preventDefault()
    setRows(rows.filter((item) => item.patient_id == search))
  }

  const getAllPrescriptions = () => {
    fetch(`${base}/KNH/patient/drugs/dispensingreport`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Found") {
              setRows(data.data);
          }
          else{
              console.log("no data");
          }
      })
  }


  useEffect(() => {
    setLoading(true);
    fetch(`${base}/KNH/patient/drugs/dispensingreport`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Found") {
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
      <ToastContainer />
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon><MedicalServicesIcon /></Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Drugs Dispensed</p>
              <h3 className={classes.cardTitle}>
              {issued > 0 ? issued : 0} <small></small>
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
                <PendingActionsIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Prescribed Dispensed</p>
              <h3 className={classes.cardTitle}>{prescribed > 0 ? prescribed : 0}</h3>
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
              <p className={classes.cardCategory}>Cancelled Prescriptions</p>
              <h3 className={classes.cardTitle}>{cancelled > 0 ? cancelled : 0}</h3>
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
              <h4 className={classes.cardTitleWhite}>Dispensed Drugs</h4>
              <p className={classes.cardCategoryWhite}>
                All Dispensed Drugs since 10th October, 2021
              </p>
            </CardHeader>
            <CardBody>
              <div className="searchOut">
                <div className="searchCont">
                  <input type="text" className="searchInput" placeholder="Search Prescription ID" onChange={(e) => {
                    if (e.target.value === "") {
                      getAllPrescriptions()
                    }
                    else{
                      setSearch(e.target.value)
                      setRows(rows.filter((item) => item.patient_id == e.target.value))
                    }
                  }}/>
                  <button className="btnSearch" onClick={searchPrescription}>Search</button>
                </div>
              </div>
              {!loading ? 
              <>
              {rows.length > 0 ? 
              <table className="styled-table">
                <thead>
                  <tr style={{marginBottom: "20px"}}>
                    <th>Prescription ID</th>
                    <th>Treatment ID</th>
                    <th>Patient ID</th>
                    <th>Drug</th>
                    <th>Usage</th>
                    <th>Notes</th>
                    <th style={{textAlign: "center"}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length > 0 ? rows.map((item) => (
                      <tr>
                        <td>{item._id}</td>
                        <td>{item.treatment_id}</td>
                        <td>{item.patient_id}</td>
                        <td>{item.drug}</td>
                        <td>{item.usage_per_day}</td>
                        <td>{item.notes}</td>
                        <td>
                          <div className="editContainer">
                            <p className="editP" style={{backgroundColor: "#11b8cc"}} onClick={() => {
                              fetch(`${base}/KNH/patient/drugs/cancel?drug_id=${item._id}`)
                              .then(response => response.json())
                              .then((data) => {
                                  if (data.message == "Updated Successfully") {
                                    toast.success("Removed Successfully")
                                    console.log("Updated")
                                    setRows([])
                                    getAllPrescriptions()
                                  }
                                  else{
                                    toast.error("Not Removed")
                                    console.log("no data");
                                  }
                              })
                            }}>Remove</p>
                          </div>
                        </td>
                    </tr>
                  )) : null}
                </tbody>
              </table>
              : 
              <div className="noData">
                <p className="txtNo">No Dispensed Drugs</p>
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
