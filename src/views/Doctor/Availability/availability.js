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

export default function DoctorAvailability() {
  const classes = useStyles();
  const { currentUser } = useAuth();

  const [date, setDate] = useState("");
  const [id, setId] = useState(currentUser.national_id);
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("");
  const [slots, setSlots] = useState("");

  const addAvailability = (e) => {
    e.preventDefault();

    const status = date === "" && id === "" && from === "" && to === "" && slots === "";
    if (!status) {
      const details = {
        date: date,
        doctor_id: id,
        fromTime: from,
        toTime: to,
        slots: slots
      }
  
      axios({
        method: 'post',
        url: 'https://ehrsystembackend.herokuapp.com/KNH/appointments/doctor/availability',
        data: details})
        .then((data) => {
          console.log(data.data)
            if (data.data.message == "Availability Placed Successfully") {
                console.log("inserted")
            }
            else{
                console.log("Not Inserted")
            }                
        })
        .catch((error) => {
            console.log(error);
      });
    }
    else{
      console.log("Parameter Missing")
    }
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Add Availability</h4>
            <p className={classes.cardCategoryWhite}>
              Availability
            </p>
          </CardHeader>
          <CardBody>
            <div className="caseOuter">
                <div className="caseContainer">
                  <div className="caseId">
                    <label className="idC">Doctor ID*</label>
                    <input placeholder="Doctor ID" className="inCase" onChange={(e) => setId(e.target.value)} value={currentUser.national_id}/>
                  </div>
                  <div className="caseText">
                    <label className="idC">Date*</label>
                    <input type="date" className="inCase" onChange={(e) => setDate(e.target.value)}/>
                  </div>
                  <div className="caseText">
                    <label className="idC">From*</label>
                    <input type="time" placeholder="From" className="inCase" onChange={(e) => setFrom(e.target.value)}/>
                  </div>
                  <div className="caseText">
                    <label className="idC">To*</label>
                    <input type="time" placeholder="From" className="inCase" onChange={(e) => setTo(e.target.value)}/>
                  </div>
                  <div className="caseText">
                    <label className="idC">Slots*</label>
                    <input type="number" placeholder="Slots" className="inCase" onChange={(e) => setSlots(e.target.value)}/>
                  </div>
                  <div className="caseFooter">
                    <button className="caseSave" onClick={addAvailability}>Add Availability</button>
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
