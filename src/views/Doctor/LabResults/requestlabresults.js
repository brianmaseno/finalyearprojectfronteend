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
import { useApprovedTreatment } from "hooks/useApprovedTreatment";
import { useLabTechnicianIds } from "hooks/useLabTechnicianIDS";
import { ToastContainer, toast } from "react-toastify";
import ProjectLoading from "components/Loading/projectloading";
import { useBaseUrl } from "hooks/useBaseUrl";
import { useLoggedInUser } from "hooks/useLoggedInUser";
import axios from 'axios';

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
  const { user } = useLoggedInUser();
  const [patientId, setPatientId] = useState("")
  const [treatmentId, setTreatmentId] = useState("");
  const [labTechnician, setLabTechnician] = useState("");
  const [notes, setNotes] = useState("");
  const { data } = useApprovedTreatment();
  const labTech = useLabTechnicianIds();
  const [loading, setLoading] = useState(false);
  const base = useBaseUrl()

  console.log(labTech);

  const requestLab = (e) => {
    e.preventDefault()

    const check = patientId == "" || user.national_id == "" || treatmentId == "" || labTechnician == ""|| notes == "";

    if (check) {
      toast.error("Parameter missing");
    }
    else {
      setLoading(true);

    const details = {
      patient_id: patientId,
      staff_id: user.national_id,
      treatment_id: treatmentId,
      lab_technician_id: labTechnician,
      test_notes: notes
    }

    axios({
      method: 'post',
      url: `${base}/KNH/patient/treatment/labrequest`,
      data: details})
      .then((data) => {
          if (data.data.message == "Inserted Successfully") {
              console.log("inserted")
              setLoading(false);
              toast.success("Request Successful");

              const message = `${user.national_id} has requested for a lab test to be conducted, check notifications for details`;
              fetch(`${base}/KNH/staff/addNotification?message=${message}&&sender_id=${user.national_id}&&category=${user.qualification}&&receiver_id=${labTechnician}`)
                .then(response => response.json())
                .then((data) => {
                    console.log(data);
                })
              }
            else{
              setLoading(false);
              console.log("Not Inserted")
              toast.error("Request Not Successful");
            }                
          })
          .catch((error) => {
            toast.error("Error");
            setLoading(false);
            console.log(error);
      });
    }
  }

  return (
    <>
    <ToastContainer />
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
                      <option value={item.treatment_id}>{item.treatment_id} ({item.patient_id})</option>
                    )): null}
                  </select>
                </div>
                <div className="caseId" style={{marginTop: "10px"}}>
                  <label className="idC">Lab Tech ID*</label>
                  <select className="inCase" onChange={(e) => setLabTechnician(e.target.value)}>
                    <option>Select...</option>
                    {labTech.length > 0 ? labTech.map((item) => (
                      <option value={item.national_id}>{item.national_id}</option>
                    )): null}
                  </select>
                </div>
                <div className="caseText">
                  <label className="noteC">Test</label>
                  <textarea className="txtC" placeholder="Test to be Conducted" onChange={(e) => setNotes(e.target.value)}>

                  </textarea>
                </div>
                <div className="caseFooter">
                  {!loading ? <button className="caseSave" onClick={requestLab}>Request</button>
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
