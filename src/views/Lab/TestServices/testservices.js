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

export default function TestServices() {
  const classes = useStyles();
  const { patients } = usePatients();
  const { lab } = useLab()
  const [loading, setLoading] = useState(true);
  const base = useBaseUrl()

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
                    <button className="pdf">PDF</button>
                    <CSVLink className="excel" data={lab}>Excel</CSVLink>
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
