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
import './makepayments.css';
import ProjectLoading from "components/Loading/projectloading";
import { ToastContainer, toast } from "react-toastify";
import { useBaseUrl } from "../../../hooks/useBaseUrl";
import StripeCheckout from "react-stripe-checkout";
import { useLoggedInUser } from "hooks/useLoggedInUser";
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

export default function MakePayment() {
  const classes = useStyles();
  const [patientId, setPatientId] = useState([])
  const [data, setData] = useState([])
  const [total, setTotal] = useState("")
  const [loading, setLoading] = useState(false);
  const [payLoad, setPayLoad] = useState(false);
  const { user } = useLoggedInUser();
  const base = useBaseUrl()
  const [product, setProduct] = useState({})
  const [item, setItem] = useState({})

  const checkPatient = (e) => {
    //e.preventDefault()

    if (!(patientId == "")) {
      setLoading(true);
      fetch(`${base}/KNH/patient/billing/${patientId}/total`)
          .then(response => response.json())
          .then((data) => {
              if (data.message == "Found") {
                  setData(data.data)
                  setLoading(false);
                  if (data.data.length > 0) {
                    let totalCost = 0
                    for (let index = 0; index < data.data.length; index++) {
                      totalCost += parseInt(data.data[index].service_cost)
                    }
                    setTotal(totalCost)
                    setProduct({
                      amount: totalCost,
                    })
                    console.log(totalCost)
                  }
              }
              else{
                setLoading(false);
                console.log("no data");
              }
          })
    }
    else{
      toast.error("Patient Id required");
    }
  }

  const sendStripePayment = token => {
  
    const details = {
      token: token,
      product: product
    }
  
    axios.post(`${base}/KNH/patient/create-checkout-session`, details)
    .then(function (response) {
      if (response.status === 200) {
        //makeAllPayments()
      }
      else{
        toast.error("Payment Not Successful")
      }
    })
    .catch(function (error) {
      console.log(error)
    })
  
  }

  const sendStripePaymentForSingleItem = token => {
  
    const details = {
      token: token,
      product: item
    }

    console.log(item)
  
    /**axios.post(`${base}/KNH/patient/create-checkout-session`, details)
    .then(function (response) {
      if (response.status === 200) {
        //makeAllPayments()
      }
      else{
        toast.error("Payment Not Successful")
      }
    })
    .catch(function (error) {
      console.log(error)
    })**/
  
  }


  const makeAllPayments = (e) => {
    e.preventDefault()

    if (data.length > 0) {
      setPayLoad(true);
      for (let index = 0; index < data.length; index++) {
        const bill_id = data[index]._id
        
        if (bill_id != null) {
          fetch(`${base}/KNH/patient/billing/pay?bill_id=${bill_id}`)
          .then(response => response.json())
          .then((data) => {
              if (data.message == "Bill Payed") {
                  console.log("Bill Payed")
                  setPayLoad(false)
                  toast.success("Bill Paid");

                  //notification
                  const message = `Bill ${bill_id} for patient ${patientId} has been settled successfully`;
                  fetch(`${base}/KNH/staff/addNotification?message=${message}&&sender_id=${user.national_id}&&category=${user.qualification}&&receiver_id=${uUser.national_id}`)
                    .then(response => response.json())
                    .then((data) => {
                        console.log(data);
                    })
              }
              else{
                  console.log("not payed");
                  setPayLoad(false);
                  toast.error("Bill not paid")
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
    <>
    <ToastContainer />
    <div className="pathCont">
      <div className="path">
        <p className="pathName">Dashboard / <span>Make Payment</span></p>
      </div>
    </div>
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
                      {!loading ? 
                      <>
                      {data.length > 0 ? 
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
                              <td style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                <div class="constCoverBtn">
                                  <div className="editContainer" onClick={(e) => {
                                    if (item._id != null) {
                                      fetch(`${base}/KNH/patient/billing/pay?bill_id=${item._id}`)
                                      .then(response => response.json())
                                      .then((data) => {
                                          if (data.message == "Bill Payed") {
                                              console.log("Bill Payed")
                                              setPayLoad(false)
                                              toast.success("Bill Paid");
                            
                                              //notification
                                              const message = `Bill ${item._id} for patient ${patientId} has been settled successfully`;
                                              fetch(`${base}/KNH/staff/addNotification?message=${message}&&sender_id=${user.national_id}&&category=${user.qualification}&&receiver_id=${user.national_id}`)
                                                .then(response => response.json())
                                                .then((data) => {
                                                    console.log(data);
                                                    checkPatient()
                                                })
                                          }
                                          else{
                                              console.log("not payed");
                                              setPayLoad(false);
                                              toast.error("Bill not paid")
                                          }
                                      })
                                  }}}>
                                    <p className="editP" style={{backgroundColor: "green"}} >Pay on discharge</p>
                                  </div>
                                  <div className="stripeBtn">
                                    <StripeCheckout 
                                      stripeKey={process.env.REACT_APP_KEY} 
                                      token={sendStripePaymentForSingleItem} 
                                      amount={parseInt(item.service_cost)}
                                      name="Make Payment" 
                                      >
                                        <button className="editContainerCard">Pay with card</button>
                                      </StripeCheckout>
                                  </div>
                                </div>
                              </td>
                          </tr>
                          ))
                          :
                          null}
                        </tbody>
                      </table>
                      :
                      <div className="noData">
                        <p className="txtNo">No Billing Items</p>
                      </div>
                      }
                      </>
                      :
                      <div className="load">
                        <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/>
                      </div>
                      }
                    </div>
                    {data.length > 0 ? 
                    <div className="recContainer">
                      <div>
                        <p className="txtReceive">Total Amount Ksh.{total}</p>
                      </div>
                      {!payLoad ? <>
                      <button className="btnReceive" onClick={makeAllPayments}>Pay on discharge</button><br/>
                      <StripeCheckout 
                          stripeKey={process.env.REACT_APP_KEY} 
                          token={sendStripePayment} 
                          amount={product.amount}
                          name="Make Payment" 
                          >
                            <button className="btnPayViaCard">Pay with card</button>
                          </StripeCheckout>
                      </>
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
