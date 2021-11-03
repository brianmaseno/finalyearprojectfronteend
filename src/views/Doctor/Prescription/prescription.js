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
import './prescription.css'
import { useDrugs } from "hooks/useDrugs";
import { useApprovedTreatment } from "hooks/useApprovedTreatment";
import { useAuth } from "hooks/AuthProvider";
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

export default function Prescription() {
  const classes = useStyles();
  const { drug } = useDrugs()
  const { data } = useApprovedTreatment()
  const [patientId, setPatientId] = useState("")
  const [drug_id, setDrug] = useState("")
  const [days, setDays] = useState("")
  const [usage, setUsage] = useState("")
  const [notes, setNotes] = useState("")
  const [treatmentId, setTreatmentId] = useState("")
  const { currentUser } = useAuth()
  
  const prescribeDrugs = (e) => {
    e.preventDefault()

    const details = {
      patient_id: patientId,
      drug: drug_id,
      notes: notes,
      usage: usage,
      days: days,
      treatment_id: treatmentId
    }

    const payDetails = {
      patient_id: patientId,
      treatment_id: treatmentId,
      service_name: "Consultation",
      service_cost: "500",
      service_department: currentUser.department_id,
      added_by: currentUser.national_id
    }

    console.log(payDetails)

    axios({
      method: 'post',
      url: 'https://ehrsystembackend.herokuapp.com/KNH/patient/drugs/prescribe',
      data: details})
      .then((data) => {
          if (data.data.message == "Inserted Successfully") {
            axios({
              method: 'post',
              url: 'https://ehrsystembackend.herokuapp.com/KNH/patient/billing/set',
              data: payDetails})
              .then((data) => {
                  if (data.data.message == "Added to Bill") {
                      console.log("Added to Bill")
                  }
                  else{
                      console.log("Not Added")
                  }                
              })
              .catch((error) => {
                  console.log(error);
          });
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
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Adding Prescription</h4>
            <p className={classes.cardCategoryWhite}>
              Prescription
            </p>
          </CardHeader>
          <CardBody>
            <div className="presOuter">
              <div className="presContainer">
                <div className="caseId">
                  <label className="idC">Patient ID*</label>
                  <input type="text" placeholder="Patient ID" className="inCase" onChange={(e) => setPatientId(e.target.value)}/>
                </div>
                <div className="caseId" style={{marginTop: "20px"}}>
                  <label className="idC">Treatment ID*</label>
                  <select className="inCase" onChange={(e) => setTreatmentId(e.target.value)}>
                    <option>Select...</option>
                    {data.length > 0 ? data.map((item) => (
                      <option value={item._id}>{item._id}</option>
                    )): null}
                  </select>
                </div>
                <div className="caseText">
                  <label className="noteC"></label>
                  <table className="tablePres">
                    <tr>
                      <th className="headPres">Drug</th>
                      <th className="headPres">No. of Days</th>
                      <th className="headPres">Usage Per Day</th>
                      <th className="headPres">Notes</th>
                    </tr>
                    <tr>
                      <td className="bodyPres">
                        <select className="presIn" onChange={(e) => setDrug(e.target.value)}>
                          <option>Select...</option>
                          {drug.length > 0 ? drug.map((item) => (
                            <option value={item._id}>{item.drug_name}</option>
                          )): null}
                        </select>
                      </td>
                      <td className="bodyPres">
                        <input type="number" placeholder="Enter Days" className="presIn" onChange={(e) => setDays(e.target.value)}/>
                      </td>
                      <td className="bodyPres">
                        <input type="text" placeholder="Usage Per Day" className="presIn" onChange={(e) => setUsage(e.target.value)}/>
                      </td>
                      <td className="bodyPres">
                        <textarea type="text" placeholder="Notes" className="presIn" onChange={(e) => setNotes(e.target.value)}>

                        </textarea>
                      </td>
                    </tr>
                  </table>
                </div>
                <div className="caseFooter">
                  <button className="caseSave" onClick={prescribeDrugs}>Add Prescription</button>
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
