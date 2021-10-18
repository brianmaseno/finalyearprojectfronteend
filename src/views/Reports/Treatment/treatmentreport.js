/* eslint-disable */  // Disables ESLint checks for this file
import React, {useState, useEffect} from "react";  // Core React library and hooks for state and effects

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";  // Material UI styling utility

// core components - Custom UI components from the application
import GridItem from "components/Grid/GridItem.js";  // Grid column component
import GridContainer from "components/Grid/GridContainer.js";  // Grid container component
import Card from "components/Card/Card.js";  // Card container component
import CardHeader from "components/Card/CardHeader.js";  // Card header component
import CardBody from "components/Card/CardBody.js";  // Card body component
import { ToastContainer, toast } from "react-toastify";  // Toast notification components
import { usePatients } from "hooks/usePatients";  // Custom hook to fetch patients data
import logo from "assets/img/logoknh.jpg";  // Hospital logo image
import { useDrugs } from "hooks/useDrugs";  // Custom hook to fetch drugs data
import { CSVLink, CSVDownload } from "react-csv";  // Components for exporting CSV data
import { useBaseUrl } from "hooks/useBaseUrl";  // Custom hook for API base URL
import axios from "axios";  // HTTP client for API requests

// Material UI style definitions
const styles = {
  cardCategoryWhite: {  // Style for white card category text with nested selectors
    "&,& a,& a:hover,& a:focus": {  // Styles for the element and its anchor tags
      color: "rgba(255,255,255,.62)",  // Semi-transparent white text
      margin: "0",  // No margin
      fontSize: "14px",  // Font size
      marginTop: "0",  // No top margin
      marginBottom: "0",  // No bottom margin
    },
    "& a,& a:hover,& a:focus": {  // Styles for anchor tags in all states
      color: "#FFFFFF",  // Full white color for links
    },
  },
  cardTitleWhite: {  // Style for white card title text
    color: "#FFFFFF",  // White text
    marginTop: "0px",  // No top margin
    minHeight: "auto",  // Auto minimum height
    fontWeight: "300",  // Light font weight
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",  // Font family with fallbacks
    marginBottom: "3px",  // Small bottom margin
    textDecoration: "none",  // No text decoration
    "& small": {  // Style for small text within the title
      color: "#777",  // Grey color
      fontSize: "65%",  // Smaller font size
      fontWeight: "400",  // Normal font weight
      lineHeight: "1",  // Default line height
    },
  },
};

// Create styles hook from the defined styles
const useStyles = makeStyles(styles);

export default function TreatmentReports() {
  const classes = useStyles();  // Initialize Material UI styles
  const { patients } = usePatients();  // Get patients data from custom hook
  const [rows, setRows] = useState([]);  // State for storing treatment report data rows
  const [patient_id, setPatientId] = useState("")  // State for selected patient ID
  const { drug } = useDrugs();  // Get drugs data from custom hook
  const [firstDate, setFirstDate] = useState("")  // State for report start date
  const [lastDate, setLastDate] = useState("")  // State for report end date
  const base = useBaseUrl()  // Get API base URL
  
  // Calculate current date for report display
  const date = new Date()
  const today = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()

  // Function to handle report filtering by date range
  // Currently contains commented out code for patient-specific report fetching
  const searchPatientReport = (e) => {
    e.preventDefault();  // Prevent default form submission behavior
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

      // console.log("Here");  // Debug log (commented)
  }

  // Effect hook to fetch all treatment reports when component mounts
  useEffect(() => {
    fetch(`${base}/KNH/patient/treatment/report/all`)  // API call to get all treatment reports
          .then(response => response.json())  // Parse response as JSON
          .then((data) => {
            console.log(data);  // Log data to console for debugging
              if (data.message == "Treatment Details Found") {  // If reports were found
                  setRows(data.data);  // Update state with report data
                  //console.log(data.data)  // Commented debug log
              }
              else{
                  console.log("no data");  // Log if no data found
              }
          })
  }, [])  // Empty dependency array means this runs once on mount

  return (
    <>
    <ToastContainer />  {/* Container for toast notifications */}
    
    {/* Breadcrumb navigation showing current location */}
    <div className="pathCont">
      <div className="path">
        <p className="pathName">Dashboard / <span>Treatment Reports</span></p>
      </div>
    </div>
    
    <GridContainer>  {/* Main grid container */}
      <GridItem xs={12} sm={12} md={12}>  {/* Full-width grid item for all screen sizes */}
        <Card>  {/* Main content card */}
          <CardHeader color="info">  {/* Card header with info (blue) color */}
            <h4 className={classes.cardTitleWhite}>Treatment Reports</h4>
            <p className={classes.cardCategoryWhite}>
              Retrieve Treatment Reports
            </p>
          </CardHeader>
          <CardBody>  {/* Card body containing report filters and data */}
            <div className="repContainer">  {/* Container for report content */}
              <div>
                {/* Date range filter form */}
                <div className="formCont">
                  {/* "From" date input */}
                  <div className="formIn">
                    <label className="labelPat">From</label>
                    <input 
                      type="date" 
                      className="patInput" 
                      onChange={(e) => setFirstDate(e.target.value)}  // Update start date state
                    />
                  </div>
                  {/* "To" date input */}
                  <div className="formIn">
                    <label className="labelPat">To</label>
                    <input 
                      type="date" 
                      className="patInput" 
                      onChange={(e) => setLastDate(e.target.value)}  // Update end date state
                    />
                  </div>
                  {/* Filter button */}
                  <div className="formBtnRep">
                    <button 
                      className="btnReport" 
                      type="submit" 
                      onClick={searchPatientReport}  // Call search function on click
                    >Go</button>
                  </div>
                </div>
              </div>
              
              {/* Conditional rendering: only show report if data exists */}
              {rows.length > 0 ? 
              <>
              {/* Report content container */}
              <div className="reportBody">
                {/* Report header with hospital info and dates */}
                <div className="reportTitle">
                  <div className="rRow">
                    {/* Hospital logo */}
                    <div className="imgCont">
                      <img src={logo} className="rImage"/>
                    </div>
                    {/* Hospital name */}
                    <div className="imgCont">
                      <p className="rTitle">Kenyatta National Hospital</p>
                    </div>
                    {/* Report type */}
                    <div className="imgCont">
                      <p className="rDesc">Treatment Report</p>
                    </div>
                    {/* Report date range (hardcoded start, dynamic end) */}
                    <div className="imgCont">
                      <p className="rDate">1/12/2021 - {today}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  {/* Conditional rendering: only show table if data exists */}
                  {rows.length > 0 ? 
                  <table className="styled-table">  {/* Treatment reports table */}
                    <thead>  {/* Table header row */}
                      <tr>
                        <th>Treatment ID</th>
                        <th>Lab</th>
                        <th>Billing</th>
                        <th>Case Notes</th>
                        <th>Prescription</th>
                      </tr>
                    </thead>
                    <tbody>  {/* Table body */}
                      {/* Map through data to create table rows */}
                      {rows.length > 0 ? rows.map((item) => (
                        <tr>
                          {/* Treatment ID column */}
                          <td className="trBody" style={{color: "gray"}}>{item.lab.treatment_id}</td>
                          
                          {/* Lab details column */}
                          <td className="trBody" style={{color: "gray"}}>
                            <div>
                              <p>Test Name: {item.lab.test_name}</p>
                              <p>Test Results: {item.lab.test_results}</p>
                              <p>Test Cost: Ksh {item.lab.test_cost}</p>
                              <p>Test Date: {item.lab.lab_test_date}</p>
                            </div>
                          </td>
                          
                          {/* Billing details column */}
                          <td className="trBody" style={{color: "gray"}}>
                          <div>
                              <p>Service Name: {item.billing.service_name}</p>
                              <p>Service Cost: Ksh {item.billing.service_cost}</p>
                              <p>Service Department: {item.billing.service_department}</p>
                              <p>Date: {item.billing.added_on}</p>
                            </div>
                          </td>
                          
                          {/* Case notes column */}
                          <td className="trBody" style={{color: "gray"}}>{item.case.treatment_notes}</td>
                          
                          {/* Prescription details column */}
                          <td className="trBody" style={{color: "gray"}}>
                            <div>
                              <p>Drug Name: {item.drugdetails.drug_name}</p>
                              <p>Drug Cost: Ksh {item.drugdetails.drug_cost}</p>
                            </div>
                          </td>
                        </tr>
                      ))
                    :
                    null }  {/* Render nothing if no rows */}                 
                    </tbody>
                  </table>
                  :
                  null }  {/* Render nothing if no rows */}
                </div>
              </div>
              
              {/* CSV export button */}
              <div className="print">
                  <CSVLink 
                    data={rows} 
                    className="excel" 
                    filename={"treatmentreport.csv"}  // Name of downloaded file
                  >Excel</CSVLink>
              </div>
              </>
              :
              null }  {/* Render nothing if no rows */}
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    </>
  );
}