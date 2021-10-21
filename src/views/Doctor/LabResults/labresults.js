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
import './results.css'

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

export default function DoctorLabTestResults() {
  const classes = useStyles();

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Lab Test Results</h4>
            <p className={classes.cardCategoryWhite}>
              Lab Test
            </p>
          </CardHeader>
          <CardBody>
            <div className="caseOuter">
              <div className="caseContainer">
                <div className="caseId">
                  <label className="idC">Patient ID*</label>
                  <input placeholder="Patient ID" className="inCase"/>
                </div>
                <div className="caseFooter">
                  <button className="caseSave">Search</button>
                  <button className="caseCancel">Cancel</button>
                </div>
                <div>
                  <div>
                    <table className="labTable">
                      <thead>
                        <tr>
                          <th className="labH">Test ID</th>
                          <th className="labH">Patient ID</th>
                          <th className="labH">Test</th>
                          <th className="labH">Date</th>
                          <th className="labH">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="labD">12341234</td>
                          <td className="labD">12341234</td>
                          <td className="labD">end value has mixed support, consider using flex-end instead end value has mixed support, consider using flex-end instead end value has mixed support, consider using flex-end instead</td>
                          <td className="labD">12/13/2021</td>
                          <td className="labD">Checked</td>
                        </tr>
                      </tbody>
                    </table>
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
