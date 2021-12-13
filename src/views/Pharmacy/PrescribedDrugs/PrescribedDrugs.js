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
import { useAuth } from "hooks/AuthProvider";
import { useDrugs } from "hooks/useDrugs";
import ProjectLoading from "components/Loading/projectloading";
import { ToastContainer, toast } from "react-toastify";
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

export default function PrescribedDrugs() {
  const classes = useStyles();
  const [patientId, setPatientId] = useState("")
  const [data, setData] = useState([])
  const { currentUser } = useAuth()
  const { drug } = useDrugs()
  const [loading, setLoading] = useState(false);
  const [disLoading, setDisLoading] = useState(false);
  const base = useBaseUrl()
  const userId = sessionStorage.getItem("UserId")

  const dispenseDrugs = (e) => {
    e.preventDefault()

    if (data.length > 0) {
      setDisLoading(true);

      for (let index = 0; index < data.length; index++) {
        const drug_id = data[index].drug_id
        const treatment_id = data[index].treatment_id
        const prescription_id = data[index].prescription_id

        const payDetails = {
          patient_id: patientId,
          treatment_id: treatment_id,
          service_name: "Drug Dispensation",
          service_cost: drug.filter((item) => item._id == drug_id)[0].drug_cost,
          service_department: currentUser.department_id,
          added_by: currentUser.national_id
        }

        fetch(`${base}/KNH/patient/drugs/issue?prescription_id=${prescription_id}&&drug_id=${drug_id}&&quantity=${"10"}`)
        .then(response => response.json())
        .then((data) => {
            if (data.message == "Updated Successfully") {
                setDisLoading(false);
                toast.success(`${drug.filter((item) => item._id == drug_id)[0].drug_name} Issued`);
                //notification
                const message = `${drug.filter((item) => item._id == drug_id)[0].drug_name} has been dispensed to ${patientId}`;
                fetch(`${base}/KNH/staff/addNotification?message=${message}&&sender_id=${userId}&&category=${currentUser.qualification}&&receiver_id=${userId}`)
                  .then(response => response.json())
                  .then((data) => {
                      console.log(data);
                  })

                  //billing
                  axios({
                    method: 'post',
                    url: `${base}/KNH/patient/billing/set`,
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

                  setData([]);
            }
            else{
              setDisLoading(false);
              toast.error("Error");
            }
        })
        
      }
    }
    else{
      console.log("no id")
    }
  }

  const checkPatient = (e) => {
    //e.preventDefault()
    setLoading(true);

    if (!(patientId === "")) {
      fetch(`${base}/KNH/patient/drugs/prescribed/patient?patient_id=${patientId}`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Found") {
            setLoading(false);
            setData(data.data);
          }
          else{
            toast.error("No Prescribed Drugs")
            setLoading(false);
            console.log("no data");
          }
      })
    }
    else{
      console.log("ID MIssing")
    }
  }

  return (
    <>
    <ToastContainer />
    <div className="pathCont">
      <div className="path">
        <p className="pathName">Dashboard / <span>Prescribed Drugs</span></p>
      </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Prescribed Drugs</h4>
            <p className={classes.cardCategoryWhite}>
              Drugs
            </p>
          </CardHeader>
          <CardBody>
            <div className="findContainer">
                  <div className="makeContainer">
                    <div className="titlePatient">
                        <p className="titleTxt">Check Prescribed Drugs</p>
                    </div>
                    <div className="checkBody">
                        <div className="checkAv">
                            <p className="patId">Patient ID</p>
                        </div>
                        <div className="checkAv">
                            <input type="text" placeholder="Enter Patient ID" className="patText" onChange={(e) => setPatientId(e.target.value)}/>
                        </div>
                        <div className="checkAv">
                            {!loading ? <button className="btnPay" onClick={checkPatient}>Check Patient</button>
                            :
                            <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/>
                            }
                        </div>
                      </div>
                  </div>
                  <div className="patientContainer">
                    <div className="titlePatient">
                          <p className="titleTxt">Drugs Prescribed</p>
                      </div>
                      <div className="checkBody">
                        {data.length > 0 ? 
                        <table className="styled-table">
                          <thead>
                            <tr style={{marginBottom: "20px"}}>
                              <th>Prescription ID</th>
                              <th>Patient ID</th>
                              <th>Drug</th>
                              <th>Usage</th>
                              <th>Notes</th>
                              <th style={{textAlign: "center"}}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((item) => (
                                <tr>
                                    <td>{item.prescription_id}</td>
                                    <td>{item.patient_id}</td>
                                    <td>{item.drug_name}</td>
                                    <td>{item.usage}</td>
                                    <td>{item.notes}</td>
                                    <td>
                                    <div className="editContainer">
                                      <p className="editP" style={{backgroundColor: "green"}} onClick={(e) => {
                                        const prescription_id = item.prescription_id
                                        const treatment_id = item.treatment_id
                                        const drug_id = item.drug_id
                                
                                        const payDetails = {
                                          patient_id: patientId,
                                          treatment_id: treatment_id,
                                          service_name: "Drug Dispensation",
                                          service_cost: drug.filter((item) => item._id == drug_id)[0].drug_cost,
                                          service_department: currentUser.department_id,
                                          added_by: currentUser.national_id
                                        }
                                
                                        fetch(`${base}/KNH/patient/drugs/issue?prescription_id=${prescription_id}&&drug_id=${drug_id}&&quantity=${"3"}`)
                                        .then(response => response.json())
                                        .then((data) => {
                                            if (data.message == "Updated Successfully") {
                                                console.log(data.message)
                                                setDisLoading(false);
                                                toast.success("Drug Issued");
                                                //notification
                                                const message = `${drug.filter((item) => item._id == drug_id)[0].drug_name} has been dispensed to ${patientId}`;
                                                fetch(`${base}/KNH/staff/addNotification?message=${message}&&sender_id=${currentUser.national_id}&&category=${currentUser.qualification}&&receiver_id=${currentUser.national_id}`)
                                                  .then(response => response.json())
                                                  .then((data) => {
                                                      console.log(data);
                                                      
                                                  })
                                
                                                  //billing
                                                  axios({
                                                    method: 'post',
                                                    url: `${base}/KNH/patient/billing/set`,
                                                    data: payDetails})
                                                    .then((data) => {
                                                        if (data.data.message == "Added to Bill") {
                                                            console.log("Added to Bill")
                                                            checkPatient();
                                                        }
                                                        else{
                                                            console.log("Not Added")
                                                        }                
                                                    })
                                                    .catch((error) => {
                                                        console.log(error);
                                                  });
                                
                                                  setData([]);
                                            }
                                            else{
                                              setDisLoading(false);
                                              toast.error("Error");
                                            }
                                        })
                                      }}>Dispense</p>
                                    </div>
                                  </td>
                                </tr>
                            ))}   
                          </tbody>
                        </table>
                        :
                        <div className="noData">
                          <p className="txtNo">No Drug</p>
                        </div>
                        }
                        
                      </div>
                      {data.length > 0 ? 
                      <div className="recContainer">
                        {!disLoading ? <button className="btnReceive" onClick={dispenseDrugs}>Dispense Drugs</button>
                        :
                        <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/>
                        }
                      </div>
                      :
                      null}
                  </div>
                </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    </>
  );
}
