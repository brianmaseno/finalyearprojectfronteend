/* eslint-disable */
import React, {useEffect, useState} from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import CancelIcon from '@material-ui/icons/Cancel';
// @material-ui/icons
import DateRange from "@material-ui/icons/DateRange";
import Update from "@material-ui/icons/Update";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { useDoctorAppointments } from "hooks/useDoctorAppointments";
import { usePatients } from "hooks/usePatients";
import ProjectLoading from "components/Loading/projectloading";
import { ToastContainer, toast } from "react-toastify";
import { useBaseUrl } from "hooks/useBaseUrl";
import { useLoggedInUser } from "hooks/useLoggedInUser";

const useStyles = makeStyles(styles);

export default function DoctorDashboard() {
  const classes = useStyles();
  const { user } = useLoggedInUser();
  const [pending, setPending] = useState([])
  const approved = useDoctorAppointments("approved", user.national_id)
  const pendingData = useDoctorAppointments("pending", user.national_id)
  const cancelled = useDoctorAppointments("cancelled", user.national_id)
  const { patients } = usePatients()
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false);
  const base = useBaseUrl()

  const searchAppointment = (e) => {
    e.preventDefault()
    setPending(pending.filter((item) => item.patient_id == search))
  }

  const getAllPendingAppointments = () => {
    fetch(`${base}/KNH/appointments/doctor/pending?doctor_id=${user.national_id}`)
    .then(response => response.json())
    .then((data) => {
        if (data.message == "Found") {
            setPending(data.data)
        }
        else{
            console.log("no Patient");
        }
    })
  }

  useEffect(() => {
    setLoading(true);
    fetch(`${base}/KNH/appointments/doctor/pending?doctor_id=${user.national_id}`)
          .then(response => response.json())
          .then((data) => {
              if (data.message == "Found") {
                  setPending(data.data);
                  setLoading(false);
              }
              else{
                  setLoading(false);
              }
          })
  }, [])
  return (
    <div>
      <ToastContainer />
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon><AccessTimeFilledIcon /></Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total Appointments</p>
              <h3 className={classes.cardTitle}>
                {(pendingData.data.length + cancelled.data.length + approved.data.length) > 0  ? (pendingData.data.length + cancelled.data.length + approved.data.length) : 0} <small></small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <PendingIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Pending Appointments</p>
              <h3 className={classes.cardTitle}>{pendingData.data ? pendingData.data.length : 0}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <CancelIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Cancelled</p>
              <h3 className={classes.cardTitle}>{cancelled.data ? cancelled.data.length : 0}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <CheckCircleIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Approved Appointments</p>
              <h3 className={classes.cardTitle}>{approved.data ? approved.data.length : 0}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Pending Appointments</h4>
              <p className={classes.cardCategoryWhite}>
                All Pending appointments since 10th October, 2021
              </p>
            </CardHeader>
            <CardBody>
              <div className="searchOut">
                <div className="searchCont">
                  <input type="text" className="searchInput" placeholder="Search Appointment By Patient ID" onChange={(e) => {
                    if (e.target.value === "") {
                      getAllPendingAppointments()
                    }
                    else{
                      setSearch(e.target.value)
                      setPending(pending.filter((item) => item.patient_id == e.target.value))
                    }
                  }}/>
                  <button className="btnSearch" onClick={searchAppointment}>Search</button>
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
                    <th style={{textAlign: "center"}}>Action</th>
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
                          <td style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                            <div className="editContainer">
                              <p className="editP" style={{backgroundColor: "green"}} onClick={() => {
                                fetch(`${base}/KNH/appointments/approve?appointment_id=${item.appointment_id}`)
                                .then(response => response.json())
                                .then((data) => {
                                    if (data.message == "Appointment Approved Successfully") {
                                      const message = `Appointment ${item.appointment_id} has been approved successfully`;
                                      fetch(`${base}/KNH/staff/addNotification?message=${message}&&sender_id=${user.national_id}&&category=${user.qualification}&&receiver_id=${item.appointment_created_by}`)
                                        .then(response => response.json())
                                        .then((data) => {
                                            console.log(data);
                                        })

                                      toast.success("Appointment Approved Successfully");
                                      setPending([]);
                                      setLoading(true)
                                      setTimeout(() => {
                                        setLoading(false);
                                        getAllPendingAppointments()
                                      }, 2000);
                                    }
                                    else{
                                      toast.error("Appointment Not Approved");
                                    }
                                })
                                }}>Approve</p>
                            </div>
                          </td>
                      </tr>
                    )) : null}
                </tbody>
              </table>
              : 
              <div className="noData">
                <p className="txtNo">No Pending Appointment</p>
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
    </div>
  );
}
