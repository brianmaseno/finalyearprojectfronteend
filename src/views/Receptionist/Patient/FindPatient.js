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
import './styles/find.css';
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

export default function FindPatient() {
  const classes = useStyles();
  const [available, setAvailable] = useState(false);
  const [patientID, setPatientID] = useState("")
  const [item, setItem] = useState([])

  const searchPatient = (e) => {
    e.preventDefault();

    const check = patientID === "";

    if (!check) {
      axios.get(`https://ehrsystembackend.herokuapp.com/KNH/patient/CheckPatientbyId?patient_id=${patientID}`)
      .then((data) => {
          if (data.data.message == "Patient Details Found") {
            console.log(data.data.data)
            setItem(data.data.data)
            setAvailable(true);
          }
          else{
            console.log("Not Found")
          }                
      })
      .catch((error) => {
          console.log(error);
      });
    }
    else{
      console.log("Missing Parameters")
    }
    

  }

  const deletePatient = (e) => {
    e.preventDefault();

    const check = patientID === "";

    if (!check) {
      axios.get(`https://ehrsystembackend.herokuapp.com/KNH/patient/DeletePatientbyId?patient_id=${patientID}`)
      .then((data) => {
          if (data.data.message == "Deleted") {
            console.log("Deleted")
            setItem([]);
          }
          else{
            console.log("Not Deleted")
          }                
      })
      .catch((error) => {
          console.log(error);
      });
    }
    else{
      console.log("Missing Parameters")
    }
    

  }

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
                        <input type="text" required placeholder="Enter Patient ID" className="patText" onChange={(e) => setPatientID(e.target.value)}/>
                    </div>
                    <div className="checkAv">
                        <button className="btnPay" onClick={searchPatient}>Check Patient</button>
                    </div>
                  </div>
              </div>
              <div className="patientContainer">
                <div className="titlePatient">
                      <p className="titleTxt">Patient Details</p>
                  </div>
                  {item.length > 0 ? 
                  <div className="checkBody">
                    {item.map((data) => (
                      <div className="checkAv">
                        <form className="frm">
                          <div className="formCont">
                            <div className="formIn">
                              <label className="labelPat">First Name</label>
                              <input placeholder="First Name" className="patInput" value={data.firstname}/>
                            </div>
                            <div className="formIn">
                              <label className="labelPat">Last Name</label>
                              <input placeholder="Last Name" className="patInput" value={data.lastname}/>
                            </div>
                          </div>
                          <div className="formCont">
                            <div className="formIn">
                              <label className="labelPat">Age</label>
                              <input placeholder="Age" className="patInput" value={data.age}/>
                            </div>
                            <div className="formIn">
                              <label className="labelPat">County</label>
                              <input placeholder="County" className="patInput" value={data.county}/>
                            </div>
                          </div>
                          <div className="formCont">
                            <div className="formIn">
                              <label className="labelPat">Sub County</label>
                              <input placeholder="Sub-County" className="patInput" value={data.sub_county}/>
                            </div>
                            <div className="formIn">
                              <label className="labelPat">Village</label>
                              <input placeholder="Village" className="patInput" value={data.village}/>
                            </div>
                          </div>
                          <div className="formCont">
                            <div className="formIn">
                              <label className="labelPat">ID</label>
                              <input placeholder="ID" className="patInput" value={data.identity_no}/>
                            </div>
                            <div className="formIn">
                              <label className="labelPat">Phone Number</label>
                              <input placeholder="Phone Number" className="patInput" value={data.telephone}/>
                            </div>
                          </div>
                          <div className="formCont">
                            <div className="formIn">
                              <label className="labelPat">Gender</label>
                              <input placeholder="Gender" className="patInput" value={data.gender}/>
                            </div>
                            <div className="formIn">
                              <label className="labelPat">Weight</label>
                              <input placeholder="Weight" className="patInput" value={data.weight}/>
                            </div>
                          </div>
                          <div className="formCont">
                            <div className="formIn">
                              <label className="labelPat">Height</label>
                              <input placeholder="Height" className="patInput" value={data.height}/>
                            </div>
                            <div className="formIn">
                              <label className="labelPat">Temperature</label>
                              <input placeholder="Temperature" className="patInput" value={data.temperature}/>
                            </div>
                          </div>

                          <div className="formBtn">
                              <button className="btnUpdate">Update Patient</button>
                              <button className="btnDelete" onClick={deletePatient}>Delete Patient</button>
                          </div>
                        </form>
                    </div>
                    ))}
                      
                    </div>
                    :
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                      <p style={{fontWeight: "bold", fontSize: "17px"}}>No Details</p>
                    </div> }
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
