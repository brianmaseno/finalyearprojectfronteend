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
const axios = require('axios').default;
import './styles/add.css';
import { ToastContainer, toast } from "react-toastify";
import ProjectLoading from "components/Loading/projectloading";
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

export default function AddPatient() {
  const classes = useStyles();
  const [showNok, setShowNok] = useState(false);
  const [loading, setLoading] = useState(false);
  const [kinLoading, setKinLoading] = useState(false)
  const base = useBaseUrl()

  //patient
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [county, setCounty] = useState("");
  const [age, setAge] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [subCounty, setSubCounty] = useState("");
  const [village, setVillage] = useState("");
  const [gender, setGender] = useState("");
  const [telephone, setTelephone] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [temperature, setTemperature] = useState("");
  const [pressure, setPressure] = useState("");

  const addPatient = (e) => {
    e.preventDefault();

    const check = firstname == "" || lastname == "" || county == "" || age == "" || identityNumber == "" || 
    subCounty == "" || village == "" || gender == "" || telephone == "" || weight == "" || height == "" || temperature == "" ||
    pressure == "";

    if (check) {
      toast.error("Parameter Missing");
    }
    else {
      setLoading(true);

      const details = {
          firstname: firstname,
          lastname: lastname,
          gender: gender,
          age: age,
          village: village,
          telephone: telephone,
          county: county,
          sub_county: subCounty,
          identityNo: identityNumber,
          weight: weight,
          height: height,
          temperature: temperature,
          pressure: pressure

      }

      axios({
          method: 'post',
          url: `${base}/KNH/patient/register`,
          data: details})
          .then((data) => {
              if (data.data.message == "Inserted Successfully") {
                  console.log("inserted")
                  setShowNok(true);
                  setLoading(false);
                  toast.success("Patient Added Successfully")
              }
              else{
                  console.log("Not Inserted")
                  setLoading(false);
                  toast.error("Patient not added")
              }                
          })
          .catch((error) => {
              console.log(error);
      });
    }
}

  //next of kin
  const [kinFirstname, setKinFirstname] = useState("");
  const [kinLastname, setKinLastname] = useState("");
  const [kinCounty, setKinCounty] = useState("");
  const [kinSubCounty, setKInSubCounty] = useState("");
  const [kinVillage, setKinVillage] = useState("");
  const [patientID, setPatientID] = useState("");
  const [kinID, setKinID] = useState("");
  const [kinPhoneNumber, setKinPhoneNumber] = useState("");
  const [kinGender, setKinGender] = useState("");

  const addNextOfKin = (e) => {
    e.preventDefault();

    const check = kinFirstname == "" || kinLastname == "" || kinCounty == "" || kinSubCounty == "" ||
    kinGender == "" || kinVillage == "" || kinID == "" || kinPhoneNumber == "" || patientID == "";

    if (check) {
      toast.error("Parameter Missing");
    }
    else {
      setKinLoading(true)

      const details = {
          firstname: kinFirstname,
          lastname: kinLastname,
          gender: kinGender,
          village: kinVillage,
          telephone: kinPhoneNumber,
          county: kinCounty,
          sub_county: kinSubCounty,
          national_id: kinID,
          patientId: patientID
      }

      axios({
          method: 'post',
          url: `${base}/KNH/patient/register/nok`,
          data: details})
          .then((data) => {
              if (data.data.message == "Inserted Successfully") {
                  console.log("inserted")
                  setKinLoading(false);
                  toast.success("Next of kin added successfully");
              }
              else{
                  console.log("Not Inserted")
                  setKinLoading(false);
                  toast.error("Next of kin not added");
              }                
          })
          .catch((error) => {
            console.log(error);
      });
    }
}


  return (
    <>
    <ToastContainer />
    <div className="pathCont">
      <div className="path">
        <p className="pathName">Dashboard / <span>Add Patient</span></p>
      </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Add Patient</h4>
            <p className={classes.cardCategoryWhite}>
              Enter Patient Details
            </p>
          </CardHeader>
          <CardBody>
            <div class="patContainer">
              <div class="tableOuter">
                <div class="patBody">
                  <div class="patColumn">
                    <div class="patRow">
                      <input type="text" required placeholder="Enter First Name" required class="patInput" onChange={(e) => setFirstname(e.target.value)}/>
                      <input type="text" required placeholder="Enter Last Name" class="patInput" onChange={(e) => setLastname(e.target.value)}/>
                      <input type="text" required placeholder="Enter Age" class="patInput" onChange={(e) => setAge(e.target.value)}/>
                    </div>
                    <div class="patRow">
                      <select class="patInput" onChange={(e) => setCounty(e.target.value)}>
                        <option class="opt">Select County...</option>
                        <option value="Baringo">Baringo</option>
                        <option value='Bomet'>Bomet</option>
                        <option value='Bungoma'>Bungoma</option>
                        <option value='Busia'>Busia</option>
                        <option value='Elgeyo-Marakwet'>Elgeyo-Marakwet</option>
                        <option value='Embu'>Embu</option>
                        <option value='Garissa'>Garissa</option>
                        <option value='Homa Bay'>Homa Bay</option>
                        <option value='Isiolo'>Isiolo</option>
                        <option value='Kajiado'>Kajiado</option>
                        <option value='Kakamega'>Kakamega</option>
                        <option value='Kericho'>Kericho</option>
                        <option value='Kiambu'>Kiambu</option>
                        <option value='Kilifi'>Kilifi</option>
                        <option value='Kirinyaga'>Kirinyaga</option>
                        <option value='Kisii'>Kisii</option>
                        <option value='Kisumu'>Kisumu</option>
                        <option value='Kitui'>Kitui</option>
                        <option value='Kwale'>Kwale</option>
                        <option value='Laikipia'>Laikipia</option>
                        <option value='Lamu'>Lamu</option>
                        <option value='Machakos'>Machakos</option>
                        <option value='Makueni'>Makueni</option>
                        <option value='Mandera'>Mandera</option>
                        <option value='Marsabit'>Marsabit</option>
                        <option value='Meru'>Meru</option>
                        <option value='Migori'>Migori</option>
                        <option value='Mombasa'>Mombasa</option>
                        <option value="Murang'a">Muranga'a</option>
                        <option value='Nairobi City'>Nairobi City</option>
                        <option value='Nakuru'>Nakuru</option>
                        <option value='Nandi'>Nandi</option>
                        <option value='Narok'>Narok</option>
                        <option value='Nyamira'>Nyamira</option>
                        <option value='Nyandarua'>Nyandarua</option>
                        <option value='Nyeri'>Nyeri</option>
                        <option value='Samburu'>Samburu</option>
                        <option value='Siaya'>Siaya</option>
                        <option value='Taita-Taveta'>Taita-Taveta</option>
                        <option value='Tana River'>Tana River</option>
                        <option value='Tharaka-Nithi'>Tharaka-Nithi</option>
                        <option value='Trans Nzoia'>Trans Nzoia</option>
                        <option value='Turkana'>Turkana</option>
                        <option value='Uasin Gishu'>Uasin Gishu</option>
                        <option value='Vihiga'>Vihiga</option>
                        <option value='West Pokot'>West Pokot</option>
                        <option value='wajir'>wajir</option>
                      </select>
                      <input type="text" required placeholder="Sub-County" class="patInput" onChange={(e) => setSubCounty(e.target.value)}/>
                      <input type="text" required placeholder="Village" class="patInput" onChange={(e) => setVillage(e.target.value)}/>
                    </div>
                    <div class="patRow">
                      <input type="text" required placeholder="National ID" class="patInput" onChange={(e) => setIdentityNumber(e.target.value)}/>
                      <input type="text" required placeholder="Phone Number" class="patInput" onChange={(e) => setTelephone(e.target.value)}/>
                      <select class="patInput" onChange={(e) => setGender(e.target.value)}>
                        <option class="opt">Select Gender...</option>
                        <option value="Male" class="opt">Male</option>
                        <option value="Female" class="opt">Female</option>
                      </select>
                    </div>
                    <div class="patRow">
                      <input type="text" required placeholder="Enter Weight" class="patInput" onChange={(e) => setWeight(e.target.value)}/>
                      <input type="text" required placeholder="Enter Height" class="patInput" onChange={(e) => setHeight(e.target.value)}/>
                      <input type="text" required placeholder="Enter Temperature (in degrees celcius)" class="patInput" onChange={(e) => setTemperature(e.target.value)}/>
                    </div>
                    <div class="patRow">
                      <input type="text" required placeholder="Enter Blood Pressure" class="patInput" onChange={(e) => setPressure(e.target.value)}/>
                    </div>
                    <div className="patRow">
                      {!loading ? <button className="patBtn" onClick={addPatient}>Submit</button>
                      :
                      <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/>
                      }
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItem>
      {showNok ? 
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Register Next of Kin</h4>
            <p className={classes.cardCategoryWhite}>
              Next of Kin Details
            </p>
          </CardHeader>
          <CardBody>
            <div class="patContainer">
              <div class="tableOuter">
                <div class="patBody">
                  <div class="patColumn">
                    <div class="patRow">
                      <input type="text" required placeholder="Patient ID" class="patInput" onChange={(e) => setPatientID(e.target.value)}/>
                      <input type="text" required placeholder="Enter Kin First Name" class="patInput" onChange={(e) => setKinFirstname(e.target.value)}/>
                      <input type="text" required placeholder="Enter Kin Last Name" class="patInput" onChange={(e) => setKinLastname(e.target.value)}/>
                    </div>
                    <div class="patRow">
                      <select class="patInput" onChange={(e) => setKinCounty(e.target.value)}>
                        <option class="opt">Select Kin County...</option>
                        <option value="Baringo">Baringo</option>
                        <option value='Bomet'>Bomet</option>
                        <option value='Bungoma'>Bungoma</option>
                        <option value='Busia'>Busia</option>
                        <option value='Elgeyo-Marakwet'>Elgeyo-Marakwet</option>
                        <option value='Embu'>Embu</option>
                        <option value='Garissa'>Garissa</option>
                        <option value='Homa Bay'>Homa Bay</option>
                        <option value='Isiolo'>Isiolo</option>
                        <option value='Kajiado'>Kajiado</option>
                        <option value='Kakamega'>Kakamega</option>
                        <option value='Kericho'>Kericho</option>
                        <option value='Kiambu'>Kiambu</option>
                        <option value='Kilifi'>Kilifi</option>
                        <option value='Kirinyaga'>Kirinyaga</option>
                        <option value='Kisii'>Kisii</option>
                        <option value='Kisumu'>Kisumu</option>
                        <option value='Kitui'>Kitui</option>
                        <option value='Kwale'>Kwale</option>
                        <option value='Laikipia'>Laikipia</option>
                        <option value='Lamu'>Lamu</option>
                        <option value='Machakos'>Machakos</option>
                        <option value='Makueni'>Makueni</option>
                        <option value='Mandera'>Mandera</option>
                        <option value='Marsabit'>Marsabit</option>
                        <option value='Meru'>Meru</option>
                        <option value='Migori'>Migori</option>
                        <option value='Mombasa'>Mombasa</option>
                        <option value="Murang'a">Muranga'a</option>
                        <option value='Nairobi City'>Nairobi City</option>
                        <option value='Nakuru'>Nakuru</option>
                        <option value='Nandi'>Nandi</option>
                        <option value='Narok'>Narok</option>
                        <option value='Nyamira'>Nyamira</option>
                        <option value='Nyandarua'>Nyandarua</option>
                        <option value='Nyeri'>Nyeri</option>
                        <option value='Samburu'>Samburu</option>
                        <option value='Siaya'>Siaya</option>
                        <option value='Taita-Taveta'>Taita-Taveta</option>
                        <option value='Tana River'>Tana River</option>
                        <option value='Tharaka-Nithi'>Tharaka-Nithi</option>
                        <option value='Trans Nzoia'>Trans Nzoia</option>
                        <option value='Turkana'>Turkana</option>
                        <option value='Uasin Gishu'>Uasin Gishu</option>
                        <option value='Vihiga'>Vihiga</option>
                        <option value='West Pokot'>West Pokot</option>
                        <option value='wajir'>wajir</option>
                      </select>
                      <input type="text" required placeholder="Kin Sub-County" class="patInput" onChange={(e) => setKInSubCounty(e.target.value)}/>
                      <input type="text" required placeholder="Kin Village" class="patInput" onChange={(e) => setKinVillage(e.target.value)}/>
                    </div>
                    <div class="patRow">
                      <input type="text" required placeholder="Kin National ID" class="patInput" onChange={(e) => setKinID(e.target.value)}/>
                      <input type="text" required placeholder="Kin Phone Number" class="patInput" onChange={(e) => setKinPhoneNumber(e.target.value)}/>
                      <select class="patInput" onChange={(e) => setKinGender(e.target.value)}>
                        <option class="opt">Select Kin Gender...</option>
                        <option value="Male" class="opt">Male</option>
                        <option value="Female" class="opt">Female</option>
                      </select>
                    </div>
                    <div className="patRow">
                      {!kinLoading ? <button className="patBtn" onClick={addNextOfKin}>Submit</button>
                      :
                      <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/>
                      }
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItem>
      :
      null }
    </GridContainer>
    </>
  );
}
