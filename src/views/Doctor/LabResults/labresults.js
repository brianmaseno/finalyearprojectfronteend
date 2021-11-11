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
import './results.css'
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

export default function DoctorLabTestResults() {
  const classes = useStyles();
  const [patientId, setPatientId] = useState("")
  const [test, setTest] = useState([])

  const checkPatient = (e) => {
    e.preventDefault()

    axios.get(`https://ehrsystembackend.herokuapp.com/KNH/patient/lab/tests/requests/patient?patient_id=${patientId}`)
      .then((data) => {
          if (data.data.message == "Requests Found") {
            setTest(data.data.data)
            console.log("Found")
          }
          else{
            console.log("Not Found")
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
            <p className="pathName">Dashboard / <span>Lab Results</span></p>
        </div>
    </div>
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
                  <input placeholder="Patient ID" className="inCase" onChange={(e) => setPatientId(e.target.value)}/>
                </div>
                <div className="caseFooter">
                  <button className="caseSave" onClick={checkPatient}>Search</button>
                </div>
                {test.length > 0 ? 
                <div>
                  <div>
                    <table className="labTable">
                      <thead>
                        <tr>
                          <th className="labH">Test ID</th>
                          <th className="labH">Patient ID</th>
                          <th className="labH">Test Results</th>
                          <th className="labH">Date</th>
                          <th className="labH">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {test.map((item) => (
                          <tr>
                            <td className="labD">{item.lab_test_id}</td>
                            <td className="labD">{item.patient_id}</td>
                            <td className="labD">{item.test_results}</td>
                            <td className="labD">{item.lab_test_date}</td>
                            <td className="labD">Checked</td>
                        </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                :
                null }
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    </>
  );
}
