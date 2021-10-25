/* eslint-disable */
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { usePatients } from "hooks/usePatients";
import './makepayments.css';

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

export default function MakePayment() {
  const classes = useStyles();
  const { patients } = usePatients();

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Receive Payment</h4>
            <p className={classes.cardCategoryWhite}>
              Payment
            </p>
          </CardHeader>
          <CardBody>
            <div className="findContainer">
                <div className="makeContainer">
                  <div className="titlePatient">
                      <p className="titleTxt">Receiving Payment</p>
                  </div>
                  <div className="checkBody">
                      <div className="checkAv">
                          <p className="patId">Patient ID</p>
                      </div>
                      <div className="checkAv">
                          <input type="text" placeholder="Enter Patient ID" className="patText"/>
                      </div>
                      <div className="checkAv">
                          <button className="btnPay">Check Patient</button>
                      </div>
                    </div>
                </div>
                <div className="patientContainer">
                  <div className="titlePatient">
                        <p className="titleTxt">Billing Items for Patient</p>
                    </div>
                    <div className="checkBody">
                      <table className="styled-table">
                        <thead>
                          <tr style={{marginBottom: "20px"}}>
                            <th>Service/Item</th>
                            <th>Quantity</th>
                            <th>Unt Price</th>
                            <th>Total</th>
                            <th style={{textAlign: "center"}}></th>
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
                                <td>
                                <div className="editContainer">
                                  <p className="editP" style={{backgroundColor: "red"}}>Remove</p>
                                </div>
                              </td>
                                </>
                                )) : null}
                            </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="recContainer">
                      <div>
                        <p className="txtReceive">Total Amount Ksh.400</p>
                      </div>
                      <button className="btnReceive">Receive Payment</button>
                    </div>
                </div>
              </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
