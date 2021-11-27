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
import { useAuth } from "hooks/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import ProjectLoading from "components/Loading/projectloading";
import { useBaseUrl } from "../../hooks/useBaseUrl";
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

export default function AddDepartment() {
  const classes = useStyles();
  const { currentUser } = useAuth()
  const [staff_id, setStaff_id] = useState("");
  const [department_name, setDepartment_name] = useState("");
  const [loading, setLoading] = useState(false);
  const base = useBaseUrl()

  const saveDepartment = (e) => {
    e.preventDefault()
    setLoading(true);

    const details = {
      department_name: department_name,
      added_by: staff_id
    }

    axios({
      method: 'post',
      url: `${base}/KNH/staff/department/add`,
      data: details})
      .then((data) => {
          if (data.data.message == "Added") {
              console.log("inserted")
              toast.success("Department Added Successfully");
              setLoading(false)
          }
          else{
              console.log("Not Inserted")
              toast.error("Department Not Added");
              setLoading(false);
          }                
      })
      .catch((error) => {
          console.log(error);
    });

  }

  return (
    <>
    <ToastContainer />
    <div className="pathCont">
        <div className="path">
            <p className="pathName">Dashboard / <span>Add Department</span></p>
        </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Adding Department</h4>
            <p className={classes.cardCategoryWhite}>
              Department
            </p>
          </CardHeader>
          <CardBody>
            <div className="caseOuter">
              <div className="caseContainer">
                <div className="caseId">
                  <label className="idC">Department Name*</label>
                  <input placeholder="Department Name" className="inCase" onChange={(e) => setDepartment_name(e.target.value)}/>
                </div>
                <div className="caseId" style={{marginTop: "10px"}}>
                  <label className="idC">Staff ID*</label>
                  <select className="inCase" onChange={(e) => setStaff_id(e.target.value)}>
                    <option>Select...</option>
                    <option>{currentUser.national_id}</option>
                  </select>
                </div>
                <div className="caseFooter">
                  {!loading ? <button className="caseSave" onClick={saveDepartment}>Save Department</button>
                  :
                  <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/> 
                  }
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    </>
  );
}
