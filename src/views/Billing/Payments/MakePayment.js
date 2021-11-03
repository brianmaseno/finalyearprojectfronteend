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
import { usePatients } from "hooks/usePatients";
import './makepayments.css';

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

export default function MakePayment() {
  const classes = useStyles();
  const [patientId, setPatientId] = useState([])
  const [data, setData] = useState([])
  const [total, setTotal] = useState("")

  const checkPatient = (e) => {
    e.preventDefault()

    if (!(patientId === "")) {
      fetch(`https://ehrsystembackend.herokuapp.com/KNH/patient/billing/${patientId}/total`)
          .then(response => response.json())
          .then((data) => {
              if (data.message == "Found") {
                  setData(data.data)
                  if (data.data.length > 0) {
                    let totalCost = 0
                    for (let index = 0; index < data.data.length; index++) {
                      totalCost += parseInt(data.data[index].service_cost)
                    }
                    setTotal(totalCost)
                    console.log(totalCost)
                  }
              }
              else{
                  console.log("no data");
              }
          })
    }
  }

  const makeAllPayments = (e) => {
    e.preventDefault()

    if (data.length > 0) {
      for (let index = 0; index < data.length; index++) {
        const bill_id = data[index]._id
        
        if (bill_id != null) {
          fetch(`https://ehrsystembackend.herokuapp.com/KNH/patient/billing/pay?bill_id=${bill_id}`)
          .then(response => response.json())
          .then((data) => {
              if (data.message == "Bill Payed") {
                  console.log("Bill Payed")
              }
              else{
                  console.log("not payed");
              }
          })
        }
      }
    }
    else{
      console.log("No Data")
    }
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Receive Payment</h4>
            <p className={classes.cardCategoryWhite}>
              Payment
            </p>
          </CardHeader>
          <CardBody>
            <div className="findContainer">
                <div className="makeContainer">
                  <div className="titlePatient">
                      <p className="titleTxt">Receiving Payment</p>
                  </div>
                  <div className="checkBody">
                      <div className="checkAv">
                          <p className="patId">Patient ID</p>
                      </div>
                      <div className="checkAv">
                          <input type="text" placeholder="Enter Patient ID" className="patText" onChange={(e) => setPatientId(e.target.value)}/>
                      </div>
                      <div className="checkAv">
                          <button className="btnPay" onClick={checkPatient}>Check Patient</button>
                      </div>
                    </div>
                </div>
                <div className="patientContainer">
                  <div className="titlePatient">
                        <p className="titleTxt">Billing Items for Patient</p>
                    </div>
                    <div className="checkBody">
                      <table className="styled-table">
                        <thead>
                          <tr style={{marginBottom: "20px"}}>
                            <th>Patient ID</th>
                            <th>Service/Item Name</th>
                            <th>Service Cost</th>
                            <th>Date</th>
                            <th style={{textAlign: "center"}}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.length > 0 ? data.map((item) => (
                            <tr>
                              <td>{item.patient_id}</td>
                              <td>{item.service_name}</td>
                              <td>Ksh {item.service_cost}</td>
                              <td>{item.added_on}</td>
                              <td>
                                <div className="editContainer">
                                  <p className="editP" style={{backgroundColor: "red"}}>Remove</p>
                                </div>
                              </td>
                          </tr>
                          ))
                            :
                            null}
                        </tbody>
                      </table>
                    </div>
                    {data.length > 0 ? 
                    <div className="recContainer">
                      <div>
                        <p className="txtReceive">Total Amount Ksh.{total}</p>
                      </div>
                      <button className="btnReceive" onClick={makeAllPayments}>Receive Payment</button>
                    </div>
                    :
                    null}
                </div>
              </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
