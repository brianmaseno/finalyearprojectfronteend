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
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import ProjectLoading from "components/Loading/projectloading";
import { useBaseUrl } from "hooks/useBaseUrl";
import { useLoggedInUser } from "hooks/useLoggedInUser";

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

export default function AddDrugs() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false)
  const base = useBaseUrl()
  const { user } = useLoggedInUser();

  //drug
  const [drugName, setDrugName] = useState("")
  const [drugCost, setDrugCost] = useState("")
  const [total, setTotal] = useState("")
  const [buyingPrice, setBuyingPrice] = useState("")
  const [drugDescription, setDrugDescription] = useState("")
  const [expiryDate, setExpiryDate] = useState("")

  const addDrug = (e) => {
    e.preventDefault();

    const check = drugName == "" || drugCost == "" || total == "" || buyingPrice == "" || drugDescription == "" || 
    expiryDate == "" || user.national_id == "";

    if (check) {
      toast.error("Parameter missing")
    }
    else {
      setLoading(true);

      const details = {
          drug_name: drugName,
          drug_cost: drugCost,
          total: total,
          buying_price: buyingPrice,
          drug_description: drugDescription,
          expiry_date: expiryDate,
          staff_id: user.national_id
      }

      axios({
          method: 'post',
          url: `${base}/KNH/patient/drugs/add`,
          data: details})
          .then((data) => {
              if (data.data.message == "Inserted Successfully") {
                  console.log("inserted")
                  setLoading(false);
                  toast.success("Drug Added Successfully")
              }
              else{
                  console.log("Not Inserted")
                  setLoading(false);
                  toast.error("Drug not added")
              }                
          })
          .catch((error) => {
            setLoading(false);
            toast.error("Error")
            console.log(error);
      });
    }
}


  return (
    <>
    <ToastContainer />
    <div className="pathCont">
      <div className="path">
        <p className="pathName">Dashboard / <span>Add Drug</span></p>
      </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Add Drug</h4>
            <p className={classes.cardCategoryWhite}>
              Enter Drug Details
            </p>
          </CardHeader>
          <CardBody>
            <div class="patContainer">
              <div class="tableOuter">
                <div class="patBody">
                  <div class="patColumn">
                    <div class="patRow">
                      <input type="text" required placeholder="Enter Drug Name" class="patInput" onChange={(e) => setDrugName(e.target.value)}/>
                      <input type="text" required placeholder="Enter Drug Description" class="patInput" onChange={(e) => setDrugDescription(e.target.value)}/>
                      <input type="number" required placeholder="Enter Drug Buying Price" class="patInput" onChange={(e) => setBuyingPrice(e.target.value)}/>
                    </div>
                    <div class="patRow">
                      <input type="number" required placeholder="Enter Drug Selling Price" class="patInput" onChange={(e) => setDrugCost(e.target.value)}/>
                      <input type="number" required placeholder="Enter Number of Drugs" class="patInput" onChange={(e) => setTotal(e.target.value)}/>
                      <input type="date" required placeholder="Expiry Date" class="patInput" onChange={(e) => setExpiryDate(e.target.value)}/>
                    </div>
                    <div className="patRow">
                      {!loading ? <button className="patBtn" onClick={addDrug}>Submit</button>
                      :
                      <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/>
                      }
                      </div>
                  </div>
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
