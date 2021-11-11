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
import { useAccountStatus } from "hooks/useAccountStatus";
import { useDataStatus } from "hooks/useDataStatus";
import { ToastContainer, toast } from "react-toastify";
import ReactLoading from 'react-loading';

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

export default function SuspendedAccounts() {
  const classes = useStyles();
  const [data, setData] = useState([])
  const [search, setSearch] = useState("")
  const { loading } = useDataStatus(data);

  const searchStaff = (e) => {
    e.preventDefault()
    setData(data.filter((item) => item.national_id == search))
  }

  const getAllSuspendedStaff = () => {
    fetch(`https://ehrsystembackend.herokuapp.com/KNH/staff/accounts/suspended`)
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
    fetch(`https://ehrsystembackend.herokuapp.com/KNH/staff/accounts/suspended`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Found") {
              setData(data.data);
          }
          else{
              console.log("no data");
          }
      })
  }, [])

  return (
    <>
    <ToastContainer />
    <div className="pathCont">
      <div className="path">
        <p className="pathName">Dashboard / <span>Suspended Accounts</span></p>
      </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>All Suspended Employees Accounts</h4>
            <p className={classes.cardCategoryWhite}>
              All Suspended Accounts details
            </p>
          </CardHeader>
          <CardBody>
            <div className="searchOut">
              <div className="searchCont">
                <input type="text" className="searchInput" placeholder="Search Employee By ID" onChange={(e) => {
                  if (e.target.value === "") {
                    getAllSuspendedStaff()
                  }
                  else{
                    setSearch(e.target.value)
                    setData(data.filter((item) => item.national_id == e.target.value))
                  }
                }}/>
                <button className="btnSearch" onClick={searchStaff}>Search</button>
              </div>
            </div>
            {loading ? 
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
                {data.length > 0 ? data.map((item) => (
                    <tr>
                      <td>{item._id}</td>
                      <td>{item.firstname}</td>
                      <td>{item.lastname}</td>
                      <td>{item.username}</td>
                      <td>{item.qualification}</td>
                      <td>{item.status}</td>
                      <td>
                        <div className="editContainer">
                          <p className="editP" style={{backgroundColor: "#11b8cc"}} onClick={() => {
                            fetch(`https://ehrsystembackend.herokuapp.com/KNH/staff/activate?username=${item.username}`)
                            .then(response => response.json())
                            .then((data) => {
                                if (data.message == "Activated") {
                                  toast.success("Account Activated");
                                  console.log("Activated")
                                }
                                else{
                                  toast.error("Account Not Activated");
                                  setUpdated(false)
                                }
                            })
                            }}>Restore</p>
                        </div>
                      </td>
                  </tr>
                )) : null}
              </tbody>
            </table>
            : 
            <div className="noData">
            <p className="txtNo">No Suspended Account</p>
          </div>
            }
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    </>
  );
}
