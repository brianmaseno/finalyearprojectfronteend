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
import { useLoggedInUser } from "hooks/useLoggedInUser";

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

export default function DoctorApprovedAppointments() {
  const classes = useStyles();
  const [approved, setApproved] = useState([])
  const { user } = useLoggedInUser();
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false);
  const base = useBaseUrl()

  const searchAppointment = (e) => {
    e.preventDefault()
    setApproved(approved.filter((item) => item.patient_id == search))
  }

  const getAllApprovedAppointments = () => {
    fetch(`${base}/KNH/appointments/doctor/approved?doctor_id=${user.national_id}`)
    .then(response => response.json())
    .then((data) => {
        if (data.message == "Found") {
            setApproved(data.data)
        }
        else{
            console.log("no Patient");
        }
    })
  }

  useEffect(() => {
    setLoading(true);
    fetch(`${base}/KNH/appointments/doctor/approved?doctor_id=${user.national_id}`)
          .then(response => response.json())
          .then((data) => {
              if (data.message == "Found") {
                  setApproved(data.data);
                  console.log(data.data);
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
            <p className="pathName">Dashboard / <span>Approved Appointments</span></p>
        </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Approved Appointments</h4>
            <p className={classes.cardCategoryWhite}>
              Appointments
            </p>
          </CardHeader>
          <CardBody>
            <div className="searchOut">
                  <div className="searchCont">
                    <input type="text" className="searchInput" placeholder="Search Appointment By Patient ID" onChange={(e) => {
                      if (e.target.value === "") {
                        getAllApprovedAppointments()
                      }
                      else{
                        setSearch(e.target.value)
                        setApproved(approved.filter((item) => item.patient_id == e.target.value))
                      }
                    }}/>
                    <button className="btnSearch" onClick={searchAppointment}>Search</button>
                  </div>
                </div>
                {!loading ? 
                <>
                {approved.length > 0 ?
                <table className="styled-table">
                  <thead>
                    <tr style={{marginBottom: "20px"}}>
                      <th>Appointment ID</th>
                      <th>Appointment Date</th>
                      <th>Patient ID</th>
                      <th>Clinician ID</th>
                      <th>Department ID</th>
                      <th style={{textAlign: "center"}}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approved.length > 0 ? approved.map((item) => (
                        <tr>
                          <td>{item._id}</td>
                          <td>{item.appointment_due_date}</td>
                          <td>{item.patient_id}</td>
                          <td>{item.doctor_id}</td>
                          <td>{item.department_id}</td>
                          <td style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                            <div className="editContainer">
                              <p className="editP" style={{backgroundColor: "red"}} onClick={() => {
                                fetch(`${base}/KNH/appointments/cancel?appointment_id=${item.appointment_id}`)
                                .then(response => response.json())
                                .then((data) => {
                                    if (data.message == "Appointment Cancelled Successfully") {
                                      toast.success("Appointment Cancelled Successfully");
                                      setApproved([])
                                      setLoading(true)
                                      setTimeout(() => {
                                        setLoading(false);
                                        getAllApprovedAppointments()
                                      }, 2000);
                                    }
                                    else{
                                      toast.error("Appointment Not Cancelled");
                                    }
                                })
                                }}>Cancel</p>
                            </div>
                          </td>
                      </tr>
                    )) : null}
                  </tbody>
                </table>
                : 
                  <div className="noData">
                  <p className="txtNo">No Approved Appointment</p>
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
