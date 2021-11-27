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
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "hooks/AuthProvider";
import ProjectLoading from "components/Loading/projectloading";
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

export default function TestResults() {
  const classes = useStyles();
  const [data, setData] = useState([])
  const [cost, setCost] = useState("")
  const [result, setResult] = useState("")
  const { currentUser } = useAuth()
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const base = useBaseUrl()

  const searchTests = (e) => {
    e.preventDefault()
    setData(data.filter((item) => item.patient_id == search))
  }

  const getAllTests = () => {
    fetch(`${base}/KNH/patient/lab/tests/requests/approved`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Requests Found") {
              setData(data.data);
          }
          else{
              console.log("no data");
          }
      })
  }

  useEffect(() => {
    setLoading(true)
    axios.get(`${base}/KNH/patient/lab/tests/requests/approved`)
      .then((data) => {
          if (data.data.message == "Requests Found") {
            setData(data.data.data)
            setLoading(false)
          }
          else{
            console.log("Not Found")
            setLoading(false)
          }                
      })
      .catch((error) => {
          console.log(error);
      });
  }, [])

  return (
    <>
    <ToastContainer />
    <div className="pathCont">
      <div className="path">
        <p className="pathName">Dashboard / <span>Test Results</span></p>
      </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Add Test Results</h4>
            <p className={classes.cardCategoryWhite}>
              Test Results
            </p>
          </CardHeader>
          <CardBody>
            <div className="searchOut">
              <div className="searchCont">
                <input type="text" className="searchInput" placeholder="Search Patient" onChange={(e) => {
                  if (e.target.value === "") {
                    getAllTests()
                  }
                  else{
                    setSearch(e.target.value)
                    setData(data.filter((item) => item.patient_id == e.target.value))
                  }
                }}/>
                <button className="btnSearch" onClick={searchTests}>Search</button>
              </div>
            </div>
            {!loading ? 
            <>
            {data.length > 0 ? 
            <table className="styled-table">
              <thead>
                <tr style={{marginBottom: "20px"}}>
                  <th>Patient ID</th>
                  <th>Test</th>
                  <th>Test Cost</th>
                  <th>Results</th>
                  <th style={{textAlign: "center"}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? data.map((item) => (
                    <tr>
                      <td>{item.patient_id}</td>
                      <td>{item.test_name}</td>
                      <td>
                        <textarea type="number" placeholder="Enter Cost" className="patInput" onChange={(e) => setCost(e.target.value)} />
                      </td>
                      <td>
                        <div>
                          <textarea placeholder="Enter Result" className="patInput" onChange={(e) => setResult(e.target.value)}>
                          </textarea>
                        </div>
                      </td>
                      <td>
                        <div className="editContainer">
                          <p className="editP" style={{backgroundColor: "#11b8cc"}} onClick={() => {
                                fetch(`${base}/KNH/patient/lab/tests/results/add?lab_test_id=${item.lab_test_id}&&test_cost=${cost}&&test_results=${result}`)
                                .then(response => response.json())
                                .then((data) => {
                                    if (data.message == "Inserted Successfully") {
                                      toast.success("Result submitted successfully")
                                      setLoading(true);
                                      setTimeout(() => {
                                        setData([]);
                                        setLoading(false);
                                        getAllTests();
                                      }, 2000);

                                      //notifications 
                                      const message = `Test ${item.lab_test_id} has been completed, check for results`;
                                      fetch(`${base}/KNH/staff/addNotification?message=${message}&&sender_id=${currentUser.national_id}&&category=${currentUser.qualification}&&receiver_id=${item.staff_id}`)
                                        .then(response => response.json())
                                        .then((data) => {
                                            console.log(data);
                                        })

                                      //billing

                                      const payDetails = {
                                        patient_id: item.patient_id,
                                        treatment_id: item.treatment_id,
                                        service_name: "Lab Tests",
                                        service_cost: cost,
                                        service_department: currentUser.department_id,
                                        added_by: currentUser.national_id
                                      }
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
                                    }
                                    else{
                                      toast.error("Result not submitted");
                                      console.log("Not Updated")
                                    }
                                })
                                }}>Submit</p>
                        </div>
                      </td>
                  </tr>
                )) : null}
              </tbody>
            </table>
            : 
            <div className="noData">
            <p className="txtNo">No Test Results</p>
          </div>
            }
            </>
            :
            <div className="load">
              <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/>
            </div>
            }
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    </>
  );
}
