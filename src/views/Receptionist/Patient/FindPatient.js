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
import './styles/find.css';

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

export default function FindPatient() {
  const classes = useStyles();

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Find Patient</h4>
            <p className={classes.cardCategoryWhite}>
              Check Patient Details
            </p>
          </CardHeader>
          <CardBody>
            <div className="findContainer">
              <div className="makeContainer">
                <div className="titlePatient">
                    <p className="titleTxt">Search Patient</p>
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
                      <p className="titleTxt">Patient Details</p>
                  </div>
                  <div className="checkBody">
                      <div className="checkAv">
                          <form className="frm">
                            <div className="formCont">
                              <div className="formIn">
                                <label className="labelPat">First Name</label>
                                <input placeholder="First Name" className="patInput"/>
                              </div>
                              <div className="formIn">
                                <label className="labelPat">Last Name</label>
                                <input placeholder="Last Name" className="patInput"/>
                              </div>
                            </div>
                            <div className="formCont">
                              <div className="formIn">
                                <label className="labelPat">Age</label>
                                <input placeholder="Age" className="patInput"/>
                              </div>
                              <div className="formIn">
                                <label className="labelPat">County</label>
                                <input placeholder="County" className="patInput"/>
                              </div>
                            </div>
                            <div className="formCont">
                              <div className="formIn">
                                <label className="labelPat">Sub County</label>
                                <input placeholder="Sub-County" className="patInput"/>
                              </div>
                              <div className="formIn">
                                <label className="labelPat">Village</label>
                                <input placeholder="Village" className="patInput"/>
                              </div>
                            </div>
                            <div className="formCont">
                              <div className="formIn">
                                <label className="labelPat">ID</label>
                                <input placeholder="ID" className="patInput"/>
                              </div>
                              <div className="formIn">
                                <label className="labelPat">Phone Number</label>
                                <input placeholder="County" className="patInput"/>
                              </div>
                            </div>
                            <div className="formCont">
                              <div className="formIn">
                                <label className="labelPat">Gender</label>
                                <input placeholder="Gender" className="patInput"/>
                              </div>
                              <div className="formIn">
                                <label className="labelPat">Weight</label>
                                <input placeholder="Weight" className="patInput"/>
                              </div>
                            </div>
                            <div className="formCont">
                              <div className="formIn">
                                <label className="labelPat">Height</label>
                                <input placeholder="Height" className="patInput"/>
                              </div>
                              <div className="formIn">
                                <label className="labelPat">Temperature</label>
                                <input placeholder="Temperature" className="patInput"/>
                              </div>
                            </div>

                            <div className="formBtn">
                                <button className="btnUpdate">Update Patient</button>
                                <button className="btnDelete">Delete Patient</button>
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
