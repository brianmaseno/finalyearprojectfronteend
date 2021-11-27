/* eslint-disable */
import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import './editaccount.css';
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

export default function EditAccounts() {
  const classes = useStyles();
  const [data, setData] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const base = useBaseUrl()

  const message = `Account suspended successfully`;

  const searchStaff = (e) => {
    e.preventDefault()
    setData(data.filter((item) => item.national_id == search))
  }

  const getAllActivatedStaff = () => {
    fetch(`${base}/KNH/staff/accounts/activated`)
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
    fetch(`${base}/KNH/staff/accounts/activated`)
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
        <p className="pathName">Dashboard / <span>Activated Accounts</span></p>
      </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>All Activated Employees Accounts</h4>
            <p className={classes.cardCategoryWhite}>
              All Activated Accounts details
            </p>
          </CardHeader>
          <CardBody>
            <div className="searchOut">
              <div className="searchCont">
                <input type="text" className="searchInput" placeholder="Search Employee By ID" onChange={(e) => {
                  if (e.target.value === "") {
                    getAllActivatedStaff()
                  }
                  else{
                    setSearch(e.target.value)
                    setData(data.filter((item) => item.national_id == e.target.value))
                  }
                }}/>
                <button className="btnSearch">Search</button>
              </div>
            </div>
            {!loading ?
            <>
            {data.length > 0 ? 
            <table className="styled-table">
              <thead>
                <tr style={{marginBottom: "20px"}}>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                  <th>Qualification</th>
                  <th>Status</th>
                  <th style={{textAlign: "center"}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data ? data.map((item) => (
                    <tr>
                      <td>{item._id}</td>
                      <td>{item.firstname}</td>
                      <td>{item.lastname}</td>
                      <td>{item.username}</td>
                      <td>{item.qualification}</td>
                      <td>{item.status}</td>
                      <td>
                        <div className="editContainer">
                          <p className="editP" onClick={() => {
                            fetch(`${base}/KNH/staff/suspend?username=${item.username}`)
                            .then(response => response.json())
                            .then((data) => {
                                if (data.message == "Suspended") {
                                  toast.success("Account Suspended");
                                  setData([]);
                                  setLoading(true);
                                  setTimeout(() => {
                                    setLoading(false);
                                   getAllActivatedStaff() 
                                  }, 2000);
                                }
                                else{
                                  toast.error("Account Not Suspended");
                                  setUpdated(false)
                                }
                            })
                            }}>Suspend</p>
                        </div>
                      </td>
                  </tr>
                )) : null}
              </tbody>
            </table>
             : 
             <div className="noData">
              <p className="txtNo">No Activated Accounts</p>
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
