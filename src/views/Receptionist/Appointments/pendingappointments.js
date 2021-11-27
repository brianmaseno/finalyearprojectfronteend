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

export default function PendingAppointments() {
  const classes = useStyles();
  const [pending, setPending] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false);
  const base = useBaseUrl()

  const searchPending = (e) => {
    e.preventDefault()
    setPending(pending.filter((item) => item.patient_id == search))
  }
  
  const getPendingAppointments = () => {
    fetch(`${base}/KNH/appointments/all/pending`)
    .then(response => response.json())
    .then((data) => {
        if (data.message == "Found") {
            setPending(data.data)
            console.log(pending)
        }
        else{
            console.log("no Appointment");
        }
    })
  }

  useEffect(() => {
    setLoading(true);
    fetch(`${base}/KNH/appointments/all/pending`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Found") {
            setPending(data.data)
            setLoading(false);
          }
          else{
            console.log("No Data")
            setLoading(false);
          }
      })
  }, [])

  return (
    <>
    <ToastContainer />
    <div className="pathCont">
      <div className="path">
        <p className="pathName">Dashboard / <span>Pending Appointments</span></p>
      </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>All Pending Appointments</h4>
            <p className={classes.cardCategoryWhite}>
              Pending Appointments details
            </p>
          </CardHeader>
          <CardBody>
          <div className="searchOut">
              <div className="searchCont">
                <input type="text" className="searchInput" placeholder="Search Appointment By ID" onChange={(e) => {
                  if (e.target.value === "") {
                    getPendingAppointments()
                  }
                  else{
                    setSearch(e.target.value)
                    setPending(pending.filter((item) => item.patient_id == e.target.value))
                  }
                }}/>
                <button className="btnSearch" onClick={searchPending}>Search</button>
              </div>
              </div>
              {!loading ? 
              <>
              {pending.length > 0 ?
              <table className="styled-table">
                <thead>
                  <tr style={{marginBottom: "20px"}}>
                    <th>Appointment ID</th>
                    <th>Appointment Date</th>
                    <th>Patient ID</th>
                    <th>Clinician ID</th>
                    <th>Department ID</th>
                    <th style={{textAlign: "center"}}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pending.length > 0 ? pending.map((item) => (
                      <tr>
                        <td>{item._id}</td>
                        <td>{item.appointment_due_date}</td>
                        <td>{item.patient_id}</td>
                        <td>{item.doctor_id}</td>
                        <td>{item.department_id}</td>
                        <td>
                        <div className="editContainer">
                          <p className="editP" style={{backgroundColor: "#11b8cc"}}>pending</p>
                        </div>
                      </td>
                    </tr>
                    )) : null}
                </tbody>
              </table>
              :
              <div className="noData">
                <p className="txtNo">No Pending Appointments</p>
              </div>}
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
