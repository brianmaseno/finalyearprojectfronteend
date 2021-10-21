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

export default function PendingAppointments() {
  const classes = useStyles();
  const { patients } = usePatients();

  return (
    <>
    <ToastContainer />
    <div className="pathCont">
      <div className="path">
        <p className="pathName">Dashboard / <span>Pending Appointments</span></p>
      </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>All Pending Appointments</h4>
            <p className={classes.cardCategoryWhite}>
              Pending Appointments details
            </p>
          </CardHeader>
          <CardBody>
          <div className="searchOut">
              <div className="searchCont">
                <input type="text" className="searchInput" placeholder="Search Appointment"/>
                <button className="btnSearch">Search</button>
              </div>
              </div>
              <table className="styled-table">
                <thead>
                  <tr style={{marginBottom: "20px"}}>
                    <th>Appointment ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Identity Number</th>
                    <th>Telephone</th>
                    <th>Gender</th>
                    <th style={{textAlign: "center"}}>Status</th>
                  </tr>
                </thead>
                <tbody>
                      <tr>
                        {patients.length > 0 ? patients.map((item) => (
                          <>
                        <td>{item._id}</td>
                        <td>{item.firstname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.identity_no}</td>
                        <td>{item.telephone}</td>
                        <td>{item.gender}</td>
                        <td>
                        <div className="editContainer">
                          <p className="editP" style={{backgroundColor: "#11b8cc"}}>pending</p>
                        </div>
                      </td>
                        </>
                        )) : null}
                    </tr>
                </tbody>
              </table>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    </>
  );
}
