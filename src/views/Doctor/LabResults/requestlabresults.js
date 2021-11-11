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
import { useAuth } from "hooks/AuthProvider";
import { useApprovedTreatment } from "hooks/useApprovedTreatment";
const axios = require('axios').default;

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

export default function RequestLabTest() {
  const classes = useStyles();
  const { currentUser } = useAuth()
  const [patientId, setPatientId] = useState("")
  const [treatmentId, setTreatmentId] = useState("");
  const [notes, setNotes] = useState("");
  const { data } = useApprovedTreatment();

  const requestLab = (e) => {
    e.preventDefault()

    const details = {
      patient_id: patientId,
      staff_id: currentUser.national_id,
      treatment_id: treatmentId,
      test_notes: notes
    }

    console.log(details)

    axios({
      method: 'post',
      url: 'https://ehrsystembackend.herokuapp.com/KNH/patient/treatment/labrequest',
      data: details})
      .then((data) => {
          if (data.data.message == "Inserted Successfully") {
              console.log("inserted")
          }
          else{
              console.log("Not Inserted")
          }                
      })
      .catch((error) => {
          console.log(error);
  });
  }

  return (
    <>
    <div className="pathCont">
        <div className="path">
            <p className="pathName">Dashboard / <span>Request Lab Results</span></p>
        </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Request Lab Test</h4>
            <p className={classes.cardCategoryWhite}>
              Lab Test
            </p>
          </CardHeader>
          <CardBody>
            <div className="caseOuter">
              <div className="caseContainer">
                <div className="caseId">
                  <label className="idC">Patient ID*</label>
                  <input placeholder="Patient ID" className="inCase" onChange={(e) => setPatientId(e.target.value)}/>
                </div>
                <div className="caseId" style={{marginTop: "10px"}}>
                  <label className="idC">Treatment ID*</label>
                  <select className="inCase" onChange={(e) => setTreatmentId(e.target.value)}>
                    <option>Select...</option>
                    {data.length > 0 ? data.map((item) => (
                      <option value={item.treatment_id}>{item._id}</option>
                    )): null}
                  </select>
                </div>
                <div className="caseText">
                  <label className="noteC">Test</label>
                  <textarea className="txtC" placeholder="Test to be Conducted" onChange={(e) => setNotes(e.target.value)}>

                  </textarea>
                </div>
                <div className="caseFooter">
                  <button className="caseSave" onClick={requestLab}>Request</button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    </>
  );
}
