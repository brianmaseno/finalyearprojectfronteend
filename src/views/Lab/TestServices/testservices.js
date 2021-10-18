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
import { useLab } from "hooks/useLab";
import { CSVLink, CSVDownload } from "react-csv";
import ProjectLoading from "components/Loading/projectloading";
import { useBaseUrl } from "hooks/useBaseUrl";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';



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
  pdfButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: 500,
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#c82333"
    },
    "&:disabled": {
      backgroundColor: "#6c757d",
      cursor: "not-allowed"
    }
  }

};

const useStyles = makeStyles(styles);

export default function TestServices() {
  const classes = useStyles();
  const { patients } = usePatients();
  const { lab } = useLab()
  const [loading, setLoading] = useState(true);
  const base = useBaseUrl();


  const generatePDF = () => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.text('Laboratory Test Services Report', 14, 20);
  doc.setFontSize(11);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

  // Use autoTable directly
  autoTable(doc, {
    startY: 40,
    head: [['Test ID', 'Test Name', 'Result', 'Cost (Ksh)']],
    body: lab.map(item => [
      item.lab_test_id,
      item.test_name,
      item.test_results,
      item.test_cost
    ]),
    theme: 'grid',
    headStyles: {
      fillColor: [17, 184, 204],
      textColor: 255
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    }
  });

  // Save PDF
  doc.save('lab-test-services.pdf');
};

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [])

  return (
    <>
    <ToastContainer />
    <div className="pathCont">
      <div className="path">
        <p className="pathName">Dashboard / <span>Test Services</span></p>
      </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Test Services Offered</h4>
            <p className={classes.cardCategoryWhite}>
              Retrieve Tests
            </p>
          </CardHeader>
          <CardBody>
            <div className="servContainer">
            <div className="print">
            <button 
  className={classes.pdfButton} 
  onClick={generatePDF}
  disabled={lab.length === 0}
>
  Generate PDF Report
</button>
              </div>
              <div className="reportBody">
                <div>
                  {!loading ? 
                  <>
                  {lab.length > 0 ? 
                  <table className="styled-table">
                    <thead>
                      <tr>
                        <th>Test ID</th>
                        <th colSpan="2">Test Name</th>
                        <th>Result</th>
                        <th>Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lab.length > 0 ? lab.map((item) => (
                        <tr>
                          <td className="trBody">{item.lab_test_id}</td>
                          <td className="trBody" colSpan="2">{item.test_name}</td>
                          <td className="trBody">{item.test_results}</td>
                          <td className="trBody">Ksh {item.test_cost}</td>
                        </tr>
                      )): null}
                    </tbody>
                  </table>
                  :
                  <div className="noData">
                    <p className="txtNo">No Test Conducted</p>
                  </div>
                  }
                  </>
                  :
                  <div className="load">
                    <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/>
                  </div>
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
