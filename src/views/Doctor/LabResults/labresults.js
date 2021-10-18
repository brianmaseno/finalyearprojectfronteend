/* eslint-disable */
import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import "./results.css";
import ProjectLoading from "components/Loading/projectloading";
import { ToastContainer, toast } from "react-toastify";
import { useBaseUrl } from "hooks/useBaseUrl";
import axios from "axios";

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
  const [patientId, setPatientId] = useState("");
  const [test, setTest] = useState([]);
  const [loading, setLoading] = useState(false);
  const base = useBaseUrl();
  const [patientIdValid, setPatientIdValid] = useState(true);
  const [patientDetails, setPatientDetails] = useState(null);

  const fetchPatientDetails = async (patientId) => {
    try {
      const response = await axios.get(`${base}/KNH/patient/CheckPatientbyId?patient_id=${patientId}`);
      if (response.data.data) {
        setPatientDetails({
          firstname: response.data.data[0].firstname,
          lastname: response.data.data[0].lastname
        });
      }
    } catch (error) {
      console.error("Error fetching patient details:", error);
      toast.error("Error loading patient details");
    }
  };
  const handlePatientIdChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 8); // Only allow digits and limit to 8
    setPatientId(value);
    setPatientIdValid(/^\d{8}$/.test(value) || value === "");
  };

  const checkPatient = (e) => {
    e.preventDefault();
  
    if (patientId && !/^\d{8}$/.test(patientId)) {
      toast.error("Patient ID must be exactly 8 digits");
      return;
    }
    const check = patientId == "";
  
    if (check) {
      toast.error("Parameter Missing");
    } else {
      setLoading(true);
      setTest([]);
      setPatientDetails(null); // Reset patient details
  
      // Fetch lab results
      axios
        .get(`${base}/KNH/patient/lab/tests/requests/patient?patient_id=${patientId}`)
        .then(async (data) => {
          if (data.data.message == "Requests Found") {
            setTest(data.data.data);
            await fetchPatientDetails(patientId); // Fetch patient details
            setLoading(false);
            console.log("Found");
          } else {
            setLoading(false);
            toast.error("No Result Found");
            console.log("Not Found");
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Error");
          console.log(error);
        });
    }
  };
  

  return (
    <>
      <ToastContainer />
      <div className="pathCont">
        <div className="path">
          <p className="pathName">
            Dashboard / <span>Lab Results</span>
          </p>
        </div>
      </div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Lab Test Results</h4>
              <p className={classes.cardCategoryWhite}>Lab Test</p>
            </CardHeader>
            <CardBody>
              <div className="caseOuter">
                <div className="caseContainer">
                  <div className="caseId">
                    <label className="idC">
                      Patient ID* (8 digits required)
                    </label>
                    <input
                      placeholder="Patient ID"
                      className="inCase"
                      onChange={handlePatientIdChange}
                      value={patientId}
                      maxLength={8}
                      pattern="\d*"
                      style={{ borderColor: patientIdValid ? "" : "red" }}
                    />
                    {!patientIdValid && patientId !== "" && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "12px",
                          marginTop: "5px",
                        }}
                      >
                        Patient ID must be exactly 8 digits
                      </div>
                    )}
                  </div>
                  <div className="caseFooter">
                    {!loading ? (
                      <button className="caseSave" onClick={checkPatient}>
                        Search
                      </button>
                    ) : (
                      <ProjectLoading
                        type="spinningBubbles"
                        color="#11b8cc"
                        height="30px"
                        width="30px"
                      />
                    )}
                  </div>
                  {test.length > 0 ? (
                    <div>
                      <div>
                                                <table className="labTable">
                          <thead>
                            <tr>
                              <th className="labH">Test ID</th>
                              <th className="labH">Patient ID</th>
                              <th className="labH">Patient Name</th>
                              <th className="labH">Test Results</th>
                              <th className="labH">Date</th>
                              <th className="labH">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {test.map((item) => (
                              <tr key={item.lab_test_id}>
                                <td className="labD">{item.lab_test_id}</td>
                                <td className="labD">{item.patient_id}</td>
                                <td className="labD">
                                  {patientDetails ? 
                                    `${patientDetails.firstname} ${patientDetails.lastname}` : 
                                    'Loading...'}
                                </td>
                                <td className="labD">{item.test_results}</td>
                                <td className="labD">{item.lab_test_date}</td>
                                <td className="labD">Checked</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
