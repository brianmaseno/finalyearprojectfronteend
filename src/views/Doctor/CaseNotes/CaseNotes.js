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
import './case.css'
import { useAuth } from "hooks/AuthProvider";

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

export default function CaseNotes() {
  const classes = useStyles();
  const { currentUser } = useAuth()
  const [patientId, setPatientId] = useState("")
  const [notes, setNotes] = useState("")

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Adding Case Notes</h4>
            <p className={classes.cardCategoryWhite}>
              Case Notes
            </p>
          </CardHeader>
          <CardBody>
            <div className="caseOuter">
              <div className="caseContainer">
                <div className="caseId">
                  <label className="idC">Patient ID*</label>
                  <input placeholder="Patient ID" className="inCase"/>
                </div>
                <div className="caseText">
                  <label className="noteC">Add Notes</label>
                  <textarea className="txtC" placeholder="Add notes">

                  </textarea>
                </div>
                <div className="caseFooter">
                  <button className="caseSave">Save Notes</button>
                  <button className="caseCancel">Cancel</button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
