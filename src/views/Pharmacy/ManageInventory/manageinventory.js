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
import ProjectLoading from "components/Loading/projectloading";
import { ToastContainer, toast } from "react-toastify";
import { useBaseUrl } from "hooks/useBaseUrl";
import { useDrugs } from "hooks/useDrugs";
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

export default function ManageInventory() {
  const classes = useStyles();
  const base = useBaseUrl()
  const { drug } = useDrugs();
  const [available, setAvailable] = useState(false);
  const [item, setItem] = useState({})
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)

  const [drugName, setDrugName] = useState("")
  const [total, setTotal] = useState("")
  const [drugCost, setDrugCost] = useState("")
  const [buyingPrice, setBuyingPrice] = useState("")
  const [drugDescription, setDrugDescription] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [drugId, setDrugId] = useState("")

  const updateDrug = (e) => {
    e.preventDefault()

    if (drugId != null) {
      setUpdateLoading(true);

      const details = {
        drug_name: drugName !== undefined ? drugName : item.drug_name,
        drug_cost: drugCost !== undefined ? drugCost : item.drug_cost,
        total: total !== undefined ? total : item.total,
        buying_price: buyingPrice !== undefined ? buyingPrice : item.drug_buying_price,
        drug_description: drugDescription !== undefined ? drugDescription : item.drug_description,
        expiry_date: expiryDate !== undefined ? expiryDate : item.expiry_date,
        drug_id: drugId
      }

      axios({
          method: 'post',
          url: `${base}/KNH/patient/drugs/edit`,
          data: details})
          .then((data) => {
            console.log(data)
              if (data.data.message == "Edited Successfully") {
                  console.log("Edited Successfully")
                  setUpdateLoading(false);
                  toast.success("Updated Successfully");
              }
              else{
                setUpdateLoading(false);
                console.log("Not Edited")
                toast.error("No Changes");
              }                
          })
          .catch((error) => {
              console.log(error);
      });
      }
      else{
        console.log("None")
      }
  }

  const searchDrug = (e) => {
    e.preventDefault();

    const check = drugId === "";

    if (!check) {
      setLoading(true);
      axios.get(`${base}/KNH/patient/drugs/retrieve?drug_id=${drugId}`)
      .then((data) => {
          if (data.data.message == "Found") {
            console.log(data.data.data)
            setItem(data.data.data)
            setAvailable(true);
            setLoading(false)

            setDrugName(item.drug_name)
            setDrugCost(item.drug_cost)
            setDrugDescription(item.drug_description)
            setExpiryDate(item.expiry_date)
            setTotal(item.total)
            setBuyingPrice(item.drug_buying_price)
          }
          else{
            setLoading(false)
            console.log("Not Found")
          }                
      })
      .catch((error) => {
          console.log(error);
      });
    }
    else{
      console.log("Missing Parameters")
    }
    

  }

  const deleteDrug = (e) => {
    e.preventDefault();

    const check = drugId === "";

    if (!check) {
      setDeleteLoading(true)
      axios.get(`${base}/KNH/patient/drugs/delete?drug_id=${drugId}`)
      .then((data) => {
          if (data.data.message == "Deleted") {
            console.log("Deleted")
            setItem([]);
            setDeleteLoading(false);
            toast.success("Deleted");
          }
          else{
            console.log("Not Deleted")
            setDeleteLoading(false);
            toast.error("Not deleted")
          }                
      })
      .catch((error) => {
          console.log(error);
      });
    }
    else{
      console.log("Missing Parameters")
    }
    

  }

  return (
    <>
    <ToastContainer />
    <div className="pathCont">
      <div className="path">
        <p className="pathName">Dashboard / <span>Manage Drugs</span></p>
      </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Manage Drugs</h4>
            <p className={classes.cardCategoryWhite}>
              Manage Drug Details
            </p>
          </CardHeader>
          <CardBody>
            <div className="findContainer">
              <div className="makeContainer">
                <div className="titlePatient">
                    <p className="titleTxt">Search Drugs</p>
                </div>
                <div className="checkBody">
                    <div className="checkAv" style={{marginBottom:"10px"}}>
                        <p className="patId">Drug Name</p>
                    </div>
                    <div className="checkAv">
                        <select className="patText" onChange={(e) => setDrugId(e.target.value)}>
                          <option>Select...</option>
                          {drug.length > 0 ? drug.map((item) => (
                            <option value={item._id}>{item.drug_name}</option>
                          )): null}
                        </select>
                    </div>
                    <div className="checkAv">
                        <button className="btnPay" onClick={searchDrug}>Check Drug</button>
                    </div>
                  </div>
              </div>
              <div className="patientContainer">
                <div className="titlePatient">
                      <p className="titleTxt">Drug Details</p>
                  </div>
                  {!loading ? 
                  <>
                  {item.drug_name != null ? 
                  <div className="checkBody">
                    {item.drug_name != null ?
                      <div className="checkAv">
                        <form className="frm">
                          <div className="formCont">
                            <div className="formIn">
                              <label className="labelPat">Drug Name</label>
                              <input placeholder={item.drug_name} className="patInput" onChange={(e) => setDrugName(e.target.value)}/>
                            </div>
                            <div className="formIn">
                              <label className="labelPat">Drug Description</label>
                              <input placeholder={item.drug_description} className="patInput" onChange={(e) => setDrugDescription(e.target.value)}/>
                            </div>
                          </div>
                          <div className="formCont">
                            <div className="formIn">
                              <label className="labelPat">Selling Price</label>
                              <input placeholder={item.drug_cost} className="patInput" onChange={(e) => setDrugCost(e.target.value)}/>
                            </div>
                            <div className="formIn">
                              <label className="labelPat">Buying Price</label>
                              <input placeholder={item.drug_buying_price} className="patInput" onChange={(e) => setBuyingPrice(e.target.value)}/>
                            </div>
                          </div>
                          <div className="formCont">
                            <div className="formIn">
                              <label className="labelPat">Total Drugs</label>
                              <input placeholder={item.total} className="patInput" onChange={(e) => setTotal(e.target.value)}/>
                            </div>
                            <div className="formIn">
                              <label className="labelPat">Expiry Date</label>
                              <input placeholder={item.expiry_date} className="patInput" onChange={(e) => setExpiryDate(e.target.value)}/>
                            </div>
                          </div>
                          <div className="formBtn">
                              {!updateLoading ? <button className="btnUpdate" onClick={updateDrug}>Update Drug</button>
                              :
                              <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/>
                              }
                              {!deleteLoading ? <button className="btnDelete" onClick={deleteDrug}>Delete Drug</button>
                              :
                              <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/>
                              }
                          </div>
                        </form>
                    </div>
                     : null}
                      
                    </div>
                    :
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                      <p style={{fontWeight: "bold", fontSize: "17px"}}>No Details</p>
                    </div> }
                    </>
                    :
                    <div className="load">
                      <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/>
                    </div>
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
