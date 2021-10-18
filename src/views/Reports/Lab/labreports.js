/* eslint-disable */ // Disable ESLint checking for this file
import React, { useState, useEffect } from "react"; // Core React library and hooks for state management and side effects

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"; // Material UI styling utility

// core components - Custom UI components from the application
import GridItem from "components/Grid/GridItem.js"; // Grid column component
import GridContainer from "components/Grid/GridContainer.js"; // Grid container component
import Card from "components/Card/Card.js"; // Card container component
import CardHeader from "components/Card/CardHeader.js"; // Card header component
import CardBody from "components/Card/CardBody.js"; // Card body component
import { ToastContainer, toast } from "react-toastify"; // Toast notification components
import { usePatients } from "hooks/usePatients"; // Custom hook to fetch patients data
import "./lab.css"; // Component-specific CSS styles
import logo from "assets/img/logoknh.jpg"; // Hospital logo image
import { CSVLink, CSVDownload } from "react-csv"; // Components for exporting data to CSV format
import { useBaseUrl } from "hooks/useBaseUrl"; // Custom hook for API base URL
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Material UI style definitions
const styles = {
  cardCategoryWhite: {
    // Style for card category text when background is dark
    "&,& a,& a:hover,& a:focus": {
      // Targets element and nested anchor tags in all states
      color: "rgba(255,255,255,.62)", // Semi-transparent white text
      margin: "0", // No margin
      fontSize: "14px", // Font size
      marginTop: "0", // No top margin
      marginBottom: "0", // No bottom margin
    },
    "& a,& a:hover,& a:focus": {
      // Targets anchor tags in all states
      color: "#FFFFFF", // Full white text for links
    },
  },
  cardTitleWhite: {
    // Style for card title text when background is dark
    color: "#FFFFFF", // White text
    marginTop: "0px", // No top margin
    minHeight: "auto", // Auto minimum height
    fontWeight: "300", // Light font weight
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", // Font family with fallbacks
    marginBottom: "3px", // Small bottom margin
    textDecoration: "none", // No text decoration
    "& small": {
      // Style for small text within the title
      color: "#777", // Grey color
      fontSize: "65%", // Smaller font size
      fontWeight: "400", // Normal font weight
      lineHeight: "1", // Default line height
    },
  },
  pdfButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: 500,
    transition: "background-color 0.3s",
    marginLeft: "10px",
    "&:hover": {
      backgroundColor: "#c82333",
    },
    "&:disabled": {
      backgroundColor: "#6c757d",
      cursor: "not-allowed",
    },
  },
};

// Create styles hook from the defined styles
const useStyles = makeStyles(styles);

export default function LabReports() {
  const classes = useStyles(); // Initialize Material UI styles
  const { patients } = usePatients(); // Get patients data from custom hook
  const [rows, setRows] = useState([]); // State for storing lab report data rows
  const base = useBaseUrl(); // Get API base URL
  const [from, setFrom] = useState(""); // State for report start date filter
  const [to, setTo] = useState(""); // State for report end date filter

  // Add after other function declarations
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add hospital logo and header
    doc.setFontSize(18);
    doc.text("Kenyatta National Hospital", 14, 20);
    doc.setFontSize(14);
    doc.text("Laboratory Test Report", 14, 30);
    doc.setFontSize(11);
    doc.text(`Generated on: ${today}`, 14, 40);
    if (from && to) {
      doc.text(`Period: ${from} to ${to}`, 14, 45);
    }

    // Create table data
    const tableData = rows.map((item) => [
      item.lab_test_date,
      item.test_name,
      item.patient_id,
      item.test_results,
      `Ksh ${item.test_cost}`,
    ]);

    // Add table
    autoTable(doc, {
      startY: 50,
      head: [["Date", "Lab Test", "Patient ID", "Results", "Cost"]],
      body: tableData,
      theme: "grid",
      headStyles: {
        fillColor: [17, 184, 204],
        textColor: 255,
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    // Save PDF
    doc.save("lab-test-report.pdf");
  };
  // Calculate current date for report display
  const date = new Date();
  const today =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  // Function to filter tests by patient ID (note: 'search' variable is not defined)
  const searchTests = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setRows(rows.filter((item) => item.patient_id == search)); // Filter rows by patient ID
  };

  // Function to fetch all lab tests
  const getAllTests = () => {
    fetch(`${base}/KNH/patient/lab/tests/report`) // API call to get all lab test reports
      .then((response) => response.json()) // Parse response as JSON
      .then((data) => {
        if (data.message == "Report Found") {
          // If reports were found
          setRows(data.data); // Update state with report data
        } else {
          toast.error("No Record"); // Show error toast notification
          console.log("no data"); // Log if no data found
        }
      });
  };

  // Effect hook to fetch lab tests when component mounts
  useEffect(() => {
    fetch(`${base}/KNH/patient/lab/tests/report`) // API call to get all lab test reports
      .then((response) => response.json()) // Parse response as JSON
      .then((data) => {
        if (data.message == "Report Found") {
          // If reports were found
          setRows(data.data); // Update state with report data
        } else {
          console.log("no data"); // Log if no data found
        }
      });
  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
      <ToastContainer /> {/* Container for toast notifications */}
      {/* Breadcrumb navigation showing current location */}
      <div className="pathCont">
        <div className="path">
          <p className="pathName">
            Dashboard / <span>Lab Reports</span>
          </p>
        </div>
      </div>
      <GridContainer>
        {" "}
        {/* Main grid container */}
        <GridItem xs={12} sm={12} md={12}>
          {" "}
          {/* Full-width grid item for all screen sizes */}
          <Card>
            {" "}
            {/* Main content card */}
            <CardHeader color="info">
              {" "}
              {/* Card header with info (blue) color */}
              <h4 className={classes.cardTitleWhite}>Lab Reports</h4>
              <p className={classes.cardCategoryWhite}>Retrieve Lab Reports</p>
            </CardHeader>
            <CardBody>
              {" "}
              {/* Card body containing report filters and data */}
              <div className="repContainer">
                {" "}
                {/* Container for report content */}
                <div>
                  {/* Date range filter form */}
                  <div className="formCont">
                    {/* "From" date input */}
                    <div className="formIn">
                      <label className="labelPat">From</label>
                      <input
                        type="date"
                        className="patInput"
                        onChange={(e) => setFrom(e.target.value)} // Update from date state
                      />
                    </div>
                    {/* "To" date input */}
                    <div className="formIn">
                      <label className="labelPat">To</label>
                      <input
                        type="date"
                        className="patInput"
                        onChange={(e) => setTo(e.target.value)} // Update to date state
                      />
                    </div>
                    {/* Filter button */}
                    <div className="formBtnRep">
                      <button
                        className="btnReport"
                        onClick={getAllTests} // Call getAllTests function on click
                      >
                        Go
                      </button>
                    </div>
                  </div>
                </div>
                {/* Conditional rendering: only show report if data exists */}
                {rows.length > 0 ? (
                  <>
                    {/* Report content container */}
                    <div className="reportBody">
                      {/* Report header with hospital info and dates */}
                      <div className="reportTitle">
                        <div className="rRow">
                          {/* Hospital logo */}
                          <div className="imgCont">
                            <img src={logo} className="rImage" />
                          </div>
                          {/* Hospital name */}
                          <div className="imgCont">
                            <p className="rTitle">Kenyatta National Hospital</p>
                          </div>
                          {/* Report type */}
                          <div className="imgCont">
                            <p className="rDesc">Laboratory Report</p>
                          </div>
                          {/* Report date range (hardcoded start, dynamic end) */}
                          <div className="imgCont">
                            <p className="rDate">1/12/2021 - {today}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        {/* Conditional rendering: only show table if data exists */}
                        {rows.length > 0 ? (
                          <table className="styled-table">
                            {" "}
                            {/* Laboratory tests table */}
                            <thead>
                              {" "}
                              {/* Table header row */}
                              <tr>
                                <th>Date</th>
                                <th>Lab Test</th>
                                <th>Patient</th>
                                <th>Results</th>
                                <th>Lab Test Cost</th>
                              </tr>
                            </thead>
                            <tbody>
                              {" "}
                              {/* Table body */}
                              {/* Map through data to create table rows */}
                              {rows.length > 0
                                ? rows.map((item) => (
                                    <tr>
                                      <td className="trBody">
                                        {item.lab_test_date}
                                      </td>{" "}
                                      {/* Test date */}
                                      <td className="trBody">
                                        {item.test_name}
                                      </td>{" "}
                                      {/* Test name */}
                                      <td className="trBody">
                                        {item.patient_id}
                                      </td>{" "}
                                      {/* Patient ID */}
                                      <td className="trBody">
                                        {item.test_results}
                                      </td>{" "}
                                      {/* Test results */}
                                      <td className="trBody">
                                        Ksh {item.test_cost}
                                      </td>{" "}
                                      {/* Test cost with currency */}
                                    </tr>
                                  ))
                                : null}{" "}
                              {/* Render nothing if no rows */}
                            </tbody>
                          </table>
                        ) : null}{" "}
                        {/* Render nothing if no rows */}
                      </div>
                    </div>

                    {/* CSV export button */}
                    <div className="print">
                      <CSVLink data={rows} className="excel">
                        Excel
                      </CSVLink>
                      <button
                        className={classes.pdfButton}
                        onClick={generatePDF}
                        disabled={rows.length === 0}
                      >
                        Generate PDF
                      </button>
                    </div>
                  </>
                ) : null}{" "}
                {/* Render nothing if no rows */}
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
