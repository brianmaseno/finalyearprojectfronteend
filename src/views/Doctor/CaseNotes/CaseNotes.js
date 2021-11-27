/* eslint-disable */
import React, {useState, useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import './case.css'
import { useAuth } from "hooks/AuthProvider";
import { useApprovedTreatment } from "hooks/useApprovedTreatment";
import { ToastContainer, toast } from "react-toastify";
import ProjectLoading from "components/Loading/projectloading";
import { useBaseUrl } from "hooks/useBaseUrl";
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

export default function CaseNotes() {
  const classes = useStyles();
  const { currentUser } = useAuth()
  const [patientId, setPatientId] = useState("")
  const [notes, setNotes] = useState("")
  const [treatment_id, setTreatment_id] = useState("")
  const { data } = useApprovedTreatment()
  const [loading, setLoading] = useState(false);
  const base = useBaseUrl()

  const saveNotes = (e) => {
    e.preventDefault()
    setLoading(true);

    const details = {
      patient_id: patientId,
      treatment_id: treatment_id,
      treatment_notes: notes,
      staff_id: currentUser.national_id
    }

    axios({
      method: 'post',
      url: `${base}/KNH/patient/treatment/add`,
      data: details})
      .then((data) => {
          if (data.data.message == "Inserted Successfully") {
              console.log("inserted")
              setLoading(false)
              toast.success("Case Added Successfully");
          }
          else{
              console.log("Not Inserted")
              setLoading(false)
              toast.error("Case Addition Failed");
          }                
      })
      .catch((error) => {
          console.log(error);
    });

  }

  return (
    <>
    <ToastContainer />
    <div className="pathCont">
        <div className="path">
            <p className="pathName">Dashboard / <span>Case Notes</span></p>
        </div>
    </div>
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
                  <input placeholder="Patient ID" className="inCase" onChange={(e) => setPatientId(e.target.value)}/>
                </div>
                <div className="caseId" style={{marginTop: "10px"}}>
                  <label className="idC">Treatment ID*</label>
                  <select className="inCase" onChange={(e) => setTreatment_id(e.target.value)}>
                    <option>Select...</option>
                    {data.length > 0 ? data.map((item) => (
                      <option value={item.treatment_id}>{item.treatment_id} ({item.patient_id})</option>
                    )): null}
                  </select>
                </div>
                <div className="caseText">
                  <label className="noteC">Add Notes</label>
                  <textarea className="txtC" placeholder="Add notes" onChange={(e) => setNotes(e.target.value)}>

                  </textarea>
                </div>
                <div className="caseFooter">
                  {!loading ? <button className="caseSave" onClick={saveNotes}>Save Notes</button>
                  :
                  <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/> 
                  }
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
