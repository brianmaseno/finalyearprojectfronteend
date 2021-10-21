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

export default function BookAppointment() {
  const classes = useStyles();

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Book Appointment</h4>
            <p className={classes.cardCategoryWhite}>
              Check Available Slots
            </p>
          </CardHeader>
          <CardBody>
            <div className="findContainer">
              <div className="makeContainer">
                <div className="titlePatient">
                    <p className="titleTxt">Check Clinician Availability</p>
                </div>
                <div className="checkBody">
                    <div className="checkAv" style={{marginTop: "15px"}}>
                        <input type="date" className="patText"/>
                    </div>
                    <div className="checkAv">
                        <button className="btnPay">Check Patient</button>
                    </div>
                  </div>
              </div>
              <div className="patientContainer">
                <div className="titlePatient">
                      <p className="titleTxt">Appointment Details</p>
                  </div>
                  <div className="checkBody">
                      <div className="checkAv">
                          <form className="frm">
                            <div className="formCont">
                              <div className="formIn">
                                <label className="labelPat">Patient ID</label>
                                <input type="text" placeholder="Patient ID" className="patInput"/>
                              </div>
                            </div>
                            <div className="formCont">
                              <div className="formIn">
                                <label className="labelPat">Clinician</label>
                                <input type="text" placeholder="Clinician" className="patInput"/>
                              </div>
                            </div>
                            <div className="formCont">
                              <div className="formIn">
                                <label className="labelPat">Date</label>
                                <input type="date" placeholder="Date" className="patInput"/>
                              </div>
                            </div>
                            <div className="formBtn">
                                <button className="btnUpdate">Save Appointment</button>
                                <button className="btnDelete">Cancel</button>
                            </div>
                          </form>
                      </div>
                    </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
