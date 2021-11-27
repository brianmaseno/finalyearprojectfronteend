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

export default function DispensedDrugs() {
  const classes = useStyles();
  const [data, setData] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const base = useBaseUrl()

  const searchPrescription = (e) => {
    e.preventDefault()
    setData(data.filter((item) => item.patient_id == search))
  }

  const getAllPrescriptions = () => {
    fetch(`${base}/KNH/patient/drugs/dispensingreport`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Found") {
              setData(data.data);
          }
          else{
              console.log("no data");
          }
      })
  }

  useEffect(() => {
    setLoading(true);
    fetch(`${base}/KNH/patient/drugs/dispensingreport`)
          .then(response => response.json())
          .then((data) => {
              if (data.message == "Found") {
                  setData(data.data);
                  setLoading(false);
              }
              else{
                  console.log("no data");
                  setLoading(false);
              }
          })
  }, [])

  return (
    <>
    <ToastContainer />
    <div className="pathCont">
      <div className="path">
        <p className="pathName">Dashboard / <span>Dispensed Drugs</span></p>
      </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>All Dispensed Drugs</h4>
            <p className={classes.cardCategoryWhite}>
              Drugs
            </p>
          </CardHeader>
          <CardBody>
            <div className="searchOut">
              <div className="searchCont">
                <input type="text" className="searchInput" placeholder="Search Patient ID" onChange={(e) => {
                  if (e.target.value === "") {
                    getAllPrescriptions()
                  }
                  else{
                    setSearch(e.target.value)
                    setData(data.filter((item) => item.patient_id == e.target.value))
                  }
                }}/>
                <button className="btnSearch" onClick={searchPrescription}>Search</button>
              </div>
            </div>
            {!loading ? 
            <>
            {data.length > 0 ? 
            <table className="styled-table">
              <thead>
                <tr style={{marginBottom: "20px"}}>
                  <th>Prescription ID</th>
                  <th>Treatment ID</th>
                  <th>Patient ID</th>
                  <th>Drug</th>
                  <th>Usage</th>
                  <th>Notes</th>
                  <th style={{textAlign: "center"}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? data.map((item) => (
                    <tr>
                      <td>{item._id}</td>
                      <td>{item.treatment_id}</td>
                      <td>{item.patient_id}</td>
                      <td>{item.drug}</td>
                      <td>{item.usage_per_day}</td>
                      <td>{item.notes}</td>
                      <td>
                        <div className="editContainer">
                          <p className="editP" style={{backgroundColor: "#11b8cc"}} onClick={() => {
                              fetch(`${base}/KNH/patient/drugs/cancel?drug_id=${item._id}`)
                              .then(response => response.json())
                              .then((data) => {
                                  if (data.message == "Updated Successfully") {
                                    toast.success("Removed Successfully");
                                    setLoading(true);
                                    setTimeout(() => {
                                      setData([])
                                      setLoading(false);
                                      getAllPrescriptions();
                                    }, 2000);

                                  }
                                  else{
                                    toast.error("Not Removed");
                                  }
                              })
                            }}>Remove</p>
                        </div>
                      </td>
                  </tr>
                )) : null}
              </tbody>
            </table>
            : 
            <div className="noData">
            <p className="txtNo">No Drug</p>
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
