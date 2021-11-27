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
import './styles/find.css';
import ProjectLoading from "components/Loading/projectloading";
const axios = require('axios').default;
import { ToastContainer, toast } from "react-toastify";
import { useBaseUrl } from "hooks/useBaseUrl";

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
  const base = useBaseUrl()
  const [available, setAvailable] = useState(false);
  const [patientID, setPatientID] = useState("")
  const [item, setItem] = useState([])
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)

  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [age, setAge] = useState("")
  const [county, setCounty] = useState("")
  const [subCounty, setSubCounty] = useState("")
  const [village, setVillage] = useState("")
  const [telephone, setTelephone] = useState("")
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [temperature, setTemperature] = useState("");
  const [pressure, setPressure] = useState("");

  const updatePatient = (e) => {
    e.preventDefault()

    if (firstname === "") {
      setFirstname(item[0].firstname)
    }
    if(lastname === ""){
      setLastname(item[0].lastname)
    }
    if(age === ""){
      setAge(item[0].age)
    }
    if(county === ""){
      setCounty(item[0].county)
    }
    if(subCounty === ""){
      setSubCounty(item[0].sub_county)
    }
    if(village === ""){
      setVillage(item[0].village)
    }
    if(telephone === ""){
      setTelephone(item[0].telephone)
    }
    if(weight === ""){
      setWeight(item[0].weight)
    }
    if(height === ""){
      setHeight(item[0].height)
    }
    if(temperature === ""){
      setTemperature(item[0].temperature)
    }
    if(pressure === ""){
      setPressure(item[0].pressure)
    }

    setUpdateLoading(true);

    const details = {
      patient_Id: patientID,
      firstname: firstname,
      lastname: lastname,
      age: age,
      village: village,
      telephone: telephone,
      county: county,
      sub_county: subCounty,
      weight: weight,
      height: height,
      temperature: temperature,
      pressure: pressure
    }

    axios({
        method: 'post',
        url: `${base}/KNH/patient/Profile/EditProfile`,
        data: details})
        .then((data) => {
          console.log(data)
            if (data.data.message == "Edited Successfully") {
                console.log("Edited Successfully")
                setUpdateLoading(false);
                toast.success("Updated Successfully");
            }
            else{
              setUpdateLoading(false);
              console.log("Not Edited")
              toast.error("Not Updated");
            }                
        })
        .catch((error) => {
            console.log(error);
    });
  }

  const searchPatient = (e) => {
    e.preventDefault();

    const check = patientID === "";

    if (!check) {
      setLoading(true);
      axios.get(`${base}/KNH/patient/CheckPatientbyId?patient_id=${patientID}`)
      .then((data) => {
          if (data.data.message == "Patient Details Found") {
            console.log(data.data.data)
            setItem(data.data.data)
            setAvailable(true);
            setLoading(false)

            setFirstname(data.data.data[0].firstname)
            setLastname(data.data.data[0].lastname)
            setAge(data.data.data[0].age)
            setCounty(data.data.data[0].county)
            setSubCounty(data.data.data[0].sub_county)
            setVillage(data.data.data[0].village)
            setTelephone(data.data.data[0].telephone)
            setWeight(data.data.data[0].weight)
            setHeight(data.data.data[0].height)
            setTemperature(data.data.data[0].temperature)
            setPressure(data.data.data[0].pressure)
          }
          else{
            setLoading(false)
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
      setDeleteLoading(true)
      axios.get(`${base}/KNH/patient/DeletePatientbyId?patient_id=${patientID}`)
      .then((data) => {
          if (data.data.message == "Deleted") {
            console.log("Deleted")
            setItem([]);
            setDeleteLoading(false);
            toast.success("Deleted");
          }
          else{
            console.log("Not Deleted")
            setDeleteLoading(false);
            toast.error("Not deleted")
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
    <>
    <ToastContainer />
    <div className="pathCont">
      <div className="path">
        <p className="pathName">Dashboard / <span>Find Patient</span></p>
      </div>
    </div>
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
                  {!loading ? 
                  <>
                  {item.length > 0 ? 
                  <div className="checkBody">
                    {item.map((data) => (
                      <div className="checkAv">
                        <form className="frm">
                          <div className="formCont">
                            <div className="formIn">
                              <label className="labelPat">First Name</label>
                              <input placeholder={data.firstname} className="patInput" onChange={(e) => setFirstname(e.target.value)}/>
                            </div>
                            <div className="formIn">
                              <label className="labelPat">Last Name</label>
                              <input placeholder={data.lastname} className="patInput" onChange={(e) => setLastname(e.target.value)}/>
                            </div>
                          </div>
                          <div className="formCont">
                            <div className="formIn">
                              <label className="labelPat">Age</label>
                              <input placeholder={data.age} className="patInput" onChange={(e) => setAge(e.target.value)}/>
                            </div>
                            <div className="formIn">
                              <label className="labelPat">County</label>
                              <input placeholder={data.county} className="patInput" onChange={(e) => setCounty(e.target.value)}/>
                            </div>
                          </div>
                          <div className="formCont">
                            <div className="formIn">
                              <label className="labelPat">Sub County</label>
                              <input placeholder={data.sub_county} className="patInput" onChange={(e) => setSubCounty(e.target.value)}/>
                            </div>
                            <div className="formIn">
                              <label className="labelPat">Village</label>
                              <input placeholder={data.village} className="patInput" onChange={(e) => setVillage(e.target.value)}/>
                            </div>
                          </div>
                          <div className="formCont">
                            <div className="formIn">
                              <label className="labelPat">ID</label>
                              <input placeholder="ID" className="patInput" value={data.identity_no}/>
                            </div>
                            <div className="formIn">
                              <label className="labelPat">Phone Number</label>
                              <input placeholder={data.telephone} className="patInput" onChange={(e) => setTelephone(e.target.value)}/>
                            </div>
                          </div>
                          <div className="formCont">
                            <div className="formIn">
                              <label className="labelPat">Gender</label>
                              <input placeholder="Gender" className="patInput" value={data.gender}/>
                            </div>
                            <div className="formIn">
                              <label className="labelPat">Weight</label>
                              <input placeholder={data.weight} className="patInput" onChange={(e) => setWeight(e.target.value)} />
                            </div>
                          </div>
                          <div className="formCont">
                            <div className="formIn">
                              <label className="labelPat">Height</label>
                              <input placeholder={data.height} className="patInput" onChange={(e) => setHeight(e.target.value)}/>
                            </div>
                            <div className="formIn">
                              <label className="labelPat">Temperature</label>
                              <input placeholder={data.temperature} className="patInput" onChange={(e) => setTemperature(e.target.value)}/>
                            </div>
                          </div>

                          <div className="formBtn">
                              {!updateLoading ? <button className="btnUpdate" onClick={updatePatient}>Update Patient</button>
                              :
                              <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/>
                              }
                              {!deleteLoading ? <button className="btnDelete" onClick={deletePatient}>Delete Patient</button>
                              :
                              <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/>
                              }
                          </div>
                        </form>
                    </div>
                    ))}
                      
                    </div>
                    :
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                      <p style={{fontWeight: "bold", fontSize: "17px"}}>No Details</p>
                    </div> }
                    </>
                    :
                    <div className="load">
                      <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/>
                    </div>
                    }
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    </>
  );
}
