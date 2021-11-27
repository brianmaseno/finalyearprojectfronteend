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
import { usePatients } from "hooks/usePatients";
import logo from "assets/img/logoknh.jpg";
import { useDrugs } from "hooks/useDrugs";
import { CSVLink, CSVDownload } from "react-csv";
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

export default function TreatmentReports() {
  const classes = useStyles();
  const { patients } = usePatients();
  const [rows, setRows] = useState([]);
  const [patient_id, setPatientId] = useState("")
  const { drug } = useDrugs();  
  const [firstDate, setFirstDate] = useState("")
  const [lastDate, setLastDate] = useState("")
  const base = useBaseUrl()
  const date = new Date()
  const today = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()

  const searchPatientReport = (e) => {
    e.preventDefault();
    /**fetch(`${base}/KNH/patient/treatment/report/patient?patient_id=${patient_id}`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Treatment Details Found") {
              setRows(data.data);
              //console.log(data.data)
          }
          else{
              console.log("no data");
          }
      })
      const first = new Date(firstDate);
      const last = new Date(lastDate);
      const diff = Math.abs(last - first);**/

      console.log(Here);
  }

  useEffect(() => {
    fetch(`${base}/KNH/patient/treatment/report/all`)
          .then(response => response.json())
          .then((data) => {
            console.log(data);
              if (data.message == "Treatment Details Found") {
                  setRows(data.data);
                  //console.log(data.data)
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
        <p className="pathName">Dashboard / <span>Treatment Reports</span></p>
      </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Treatment Reports</h4>
            <p className={classes.cardCategoryWhite}>
              Retrieve Treatment Reports
            </p>
          </CardHeader>
          <CardBody>
            <div className="repContainer">
              <div>
                <div className="formCont">
                  <div className="formIn">
                    <label className="labelPat">From</label>
                    <input type="date" className="patInput" onChange={(e) => setFirstDate(e.target.value)}/>
                  </div>
                  <div className="formIn">
                    <label className="labelPat">To</label>
                    <input type="date" className="patInput" onChange={(e) => setLastDate(e.target.value)}/>
                  </div>
                  <div className="formBtnRep">
                    <button className="btnReport" type="submit" onClick={searchPatientReport}>Go</button>
                  </div>
                </div>
              </div>
              {rows.length > 0 ? 
              <>
              <div className="reportBody">
                <div className="reportTitle">
                  <div className="rRow">
                    <div className="imgCont">
                      <img src={logo} className="rImage"/>
                    </div>
                    <div className="imgCont">
                      <p className="rTitle">Kenyatta National Hospital</p>
                    </div>
                    <div className="imgCont">
                      <p className="rDesc">Treatment Report</p>
                    </div>
                    <div className="imgCont">
                      <p className="rDate">1/12/2021 - {today}</p>
                    </div>
                  </div>
                </div>
                <div>
                  {rows.length > 0 ? 
                  <table className="styled-table">
                    <thead>
                      <tr>
                        <th>Treatment ID</th>
                        <th>Lab</th>
                        <th>Billing</th>
                        <th>Case Notes</th>
                        <th>Prescription</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.length > 0 ? rows.map((item) => (
                        <tr>
                          <td className="trBody" style={{color: "gray"}}>{item.lab.treatment_id}</td>
                          <td className="trBody" style={{color: "gray"}}>
                            <div>
                              <p>Test Name: {item.lab.test_name}</p>
                              <p>Test Results: {item.lab.test_results}</p>
                              <p>Test Cost: Ksh {item.lab.test_cost}</p>
                              <p>Test Date: {item.lab.lab_test_date}</p>
                            </div>
                          </td>
                          <td className="trBody" style={{color: "gray"}}>
                          <div>
                              <p>Service Name: {item.billing.service_name}</p>
                              <p>Service Cost: Ksh {item.billing.service_cost}</p>
                              <p>Service Department: {item.billing.service_department}</p>
                              <p>Date: {item.billing.added_on}</p>
                            </div>
                          </td>
                          <td className="trBody" style={{color: "gray"}}>{item.case.treatment_notes}</td>
                          <td className="trBody" style={{color: "gray"}}>
                            <div>
                              <p>Drug Name: {item.drugdetails.drug_name}</p>
                              <p>Drug Cost: Ksh {item.drugdetails.drug_cost}</p>
                            </div>
                          </td>
                        </tr>
                      ))
                    :
                    null }                     
                    </tbody>
                  </table>
                  :
                  null }
                </div>
              </div>
              <div className="print">
                  <button className="pdf">PDF</button>
                  <CSVLink data={rows} className="excel" filename={"treatmentreport.csv"}>Excel</CSVLink>
              </div>
              </>
              :
              null }
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    </>
  );
}
