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
import { useAccountStatus } from "hooks/useAccountStatus";
import { ToastContainer, toast } from "react-toastify";
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

export default function LabRequests() {
  const classes = useStyles();
  const { data } = useAccountStatus("suspended");
 const [loading, setLoading] = useState(false)
  const [test, setTest] = useState([])
  const [search, setSearch] = useState("")
  const base = useBaseUrl()

  const searchTests = (e) => {
    e.preventDefault()
    if (search != "") {
      setTest([]);
      fetch(`${base}/KNH/patient/lab/tests/requests`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Requests Found") {
              setTest(data.data.filter((item) => item.patient_id == search));
          }
          else{
              console.log("no data");
          }
      })
    }
  }

  const getAllTests = () => {
    fetch(`${base}/KNH/patient/lab/tests/requests`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Requests Found") {
              setTest(data.data);
          }
          else{
              console.log("no data");
          }
      })
  }

  useEffect(() => {
    setLoading(true);
    axios.get(`${base}/KNH/patient/lab/tests/requests`)
      .then((data) => {
          if (data.data.message == "Requests Found") {
            setTest(data.data.data)
            setLoading(false)
          }
          else{
            console.log("Not Found")
            setLoading(false);
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
        <p className="pathName">Dashboard / <span>Lab Requests</span></p>
      </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>All Pending Lab Requests</h4>
            <p className={classes.cardCategoryWhite}>
              Lab Requests Details
            </p>
          </CardHeader>
          <CardBody>
            <div className="searchOut">
              <div className="searchCont">
                <input type="text" className="searchInput" placeholder="Search Requests" onChange={(e) => {
                  if (e.target.value === "") {
                    getAllTests()
                  }
                  else{
                    setSearch(e.target.value)
                    setTest(test.filter((item) => item.patient_id == e.target.value))
                  }
                }}/>
                <button className="btnSearch" onClick={searchTests}>Search</button>
              </div>
            </div>
            {!loading ? 
            <>
            {test.length > 0 ? 
            <table className="styled-table">
              <thead>
                <tr style={{marginBottom: "20px"}}>
                  <th>Patient ID</th>
                  <th>Treatment ID</th>
                  <th>Doctor ID</th>
                  <th>Test</th>
                  <th style={{textAlign: "center"}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {test.length > 0 ? test.map((item) => (
                    <tr>
                      <td>{item.patient_id}</td>
                      <td>{item.treatment_id}</td>
                      <td>{item.staff_id}</td>
                      <td>{item.test_name}</td>
                      <td style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <div className="editContainer">
                          <p className="editP" style={{backgroundColor: "#11b8cc"}} onClick={() => {
                            console.log(item.lab_test_id)
                                fetch(`${base}/KNH/patient/treatment/labrequest/approve?lab_test_id=${item.lab_test_id}`)
                                .then(response => response.json())
                                .then((data) => {
                                    if (data.message == "Approved Successfully") {
                                      toast.success("Test Approved Successfully")
                                      setLoading(true);
                                      setTimeout(() => {
                                        setTest([]);
                                        setLoading(false);
                                        getAllTests()
                                      }, 2000);
                                    }
                                    else{
                                      toast.error("Not Approved");
                                      console.log("Not Approved")
                                    }
                                })
                                }}>Confirm</p>
                        </div>
                      </td>
                  </tr>
                )) : null}
              </tbody>
            </table>
            : 
            <div className="noData">
              <p className="txtNo">No Pending Test Requests</p>
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
