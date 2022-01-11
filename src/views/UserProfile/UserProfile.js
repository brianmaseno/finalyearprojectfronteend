/* eslint-disable */
import React, {useState, useEffect} from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
//import ReactLoading from "react-loading";
import "react-toastify/dist/ReactToastify.css";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Input from "@material-ui/core/Input";
import avatar from "assets/img/faces/personaccount.png";
import './profile.css'
import { useBaseUrl } from "hooks/useBaseUrl";
import ProjectLoading from "components/Loading/projectloading";
import { useLoggedInUser } from "hooks/useLoggedInUser";


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  const { user } = useLoggedInUser();

  const base = useBaseUrl()
  const [loading, setLoading] = useState(false)
  const [firstName, setFirstName] = useState(user.firstname)
  const [lastName, setLastName] = useState(user.lastname)
  const [username, setUsername] = useState(user.username)
  const [country, setCountry] = useState(user.country)
  const [residence, setResidence] = useState(user.residence)
  const [county, setCounty] = useState(user.county)
  const [password, setPassword] = useState(user.password)

  console.log("User info " + user.national_id);
  
  const updateProfile = (e) => {
    e.preventDefault()
    setLoading(true)

    fetch(`${base}/KNH/staff/profile/edit?national_id=${user.national_id}&&username=${username}&&firstname=${firstName}&&lastname=${lastName}&&country=${country}&&county=${county}&&residence=${residence}&&password=${password}`)
      .then(response => response.json())
      .then((data) => {
          if (data.message != "Updated Successfully") {
              toast.error("Not Updated");
              setLoading(false)
          }
          else{  
            toast.success("Updated Successfully");   
            fetch(`${base}/KNH/staff/details?national_id=${user.national_id}`)
            .then(response => response.json())
            .then((data) => {
              if (data.message == "Found") {
                setCurrentUser(data.data)
                sessionStorage.setItem("password", password)
              }
            })      
            setLoading(false)
          }
      })
      .catch((error) => {
          console.log(error);
      });
  }

  return (
    <div>
      <ToastContainer />
      <div className="pathCont">
        <div className="path">
            <p className="pathName">Dashboard / <span>Profile</span></p>
        </div>
      </div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer style={{marginTop: "100px", marginBottom: "100px"}}>
                <GridItem xs={12} sm={12} md={5} style={{display: "flex", flexDirection: "column", justifyContent: "center", marginBottom: "20px", marginTop: "20px"}}>
                  <Input
                    placeholder="First Name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3} style={{display: "flex", flexDirection: "column", justifyContent: "center", marginBottom: "20px", marginTop: "20px"}}>
                  <Input
                    placeholder="Last Name"
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4} style={{display: "flex", flexDirection: "column", justifyContent: "center", marginBottom: "20px", marginTop: "20px"}}>
                  <Input
                    placeholder="Username"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6} style={{display: "flex", flexDirection: "column", justifyContent: "center", marginBottom: "20px", marginTop: "20px"}}>
                  <Input
                    placeholder="Country"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6} style={{display: "flex", flexDirection: "column", justifyContent: "center", marginBottom: "20px", marginTop: "20px"}}>
                  <Input
                    placeholder="County"
                    id="city"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(e) => setCounty(e.target.value)}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6} style={{display: "flex", flexDirection: "column", justifyContent: "center", marginBottom: "20px", marginTop: "20px"}}>
                  <Input
                    placeholder="Residence"
                    id="country"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(e) => setResidence(e.target.value)}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6} style={{display: "flex", flexDirection: "column", justifyContent: "center", marginBottom: "20px", marginTop: "20px"}}>
                  <Input
                    placeholder="New Password"
                    type="password"
                    id="password"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              {!loading ? <Button color="info" onClick={updateProfile}>Update Profile</Button>
              :
              <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/> 
              }
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center", padding: "15px"}}>
                  <img src={avatar} alt="..."/>
                </div>
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className="profileQualification">{user.qualification}</h6>
              <h4 className="profileName">{user.username + " " + user.lastname}</h4>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
