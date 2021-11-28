/* eslint-disable */
import React, {useState, useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GppGoodIcon from '@mui/icons-material/GppGood';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import '../../Doctor/LabResults/results.css'
import './update.css'
import ProjectLoading from "components/Loading/projectloading";
import { ToastContainer, toast } from "react-toastify";
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

export default function ChangePassword() {
  const classes = useStyles();
  const [staff, setStaff] = useState({})
  const [nationalId, setNationalId] = useState("")
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false)
  const [password, setPassword] = useState("")
  const base = useBaseUrl()

  const checkStaff = (e) => {
    e.preventDefault()
    setLoading(true);
    setStaff({})

    axios.get(`${base}/KNH/staff/details?national_id=${nationalId}`)
      .then((data) => {
          if (data.data.message == "Found") {
            setStaff(data.data.data)
            setLoading(false)
          }
          else{
            setLoading(false)
          }                
      })
      .catch((error) => {
        setLoading(false)
        console.log(error);
      });
  }

  const updatePassword = (e) => {
    e.preventDefault()
    setUpdateLoading(true);

    axios.get(`${base}/KNH/staff/staff/password/update?national_id=${nationalId}&&password=${password}`)
      .then((data) => {
          if (data.data.message == "Updated") {
            toast.success("Password Updated Successfully")
            setUpdateLoading(false)
          }
          else{
            toast.error("Not Updated")
            setLoading(false)
          }                
      })
      .catch((error) => {
        toast.error("Error")
        setLoading(false)
        console.log(error);
      });
  }

  return (
    <>
    <ToastContainer />
    <div className="pathCont">
        <div className="path">
            <p className="pathName">Dashboard / <span>Change Password</span></p>
        </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Update Staff Password</h4>
            <p className={classes.cardCategoryWhite}>
              Password
            </p>
          </CardHeader>
          <CardBody>
            <div className="caseOuter">
              <div className="caseContainer">
                <div className="caseId">
                  <label className="idC">Staff ID*</label>
                  <input placeholder="Staff ID" className="inCase" onChange={(e) => setNationalId(e.target.value)}/>
                </div>
                <div className="caseFooter">
                  {!loading ? <button className="caseSave" onClick={checkStaff}>Search</button>
                  :
                  <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/> 
                  }
                </div>
                {staff.national_id != null ? 
                <div className="availableCont">
                  <div className="avCont">
                    <div className="iconGood"><GppGoodIcon style={{color: "green"}}/></div>
                    <div className="avTxt"><p className="avVerify">Verified</p></div>
                  </div>
                  <div className="avContPass">
                    <input type="password" placeholder="New Password" className="inpUpdateInput" onChange={(e) => setPassword(e.target.value)}/><br/>
                    {!updateLoading ? <button className="btnUpdatePass" onClick={updatePassword}>Update Password</button>
                    :
                    <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/> 
                    }
                  </div>
                </div>
                :
                null
                }
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    </>
  );
}
