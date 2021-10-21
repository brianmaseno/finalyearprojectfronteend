/* eslint-disable */
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import './styles/add.css';

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

export default function AddPatient() {
  const classes = useStyles();

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Add Patient</h4>
            <p className={classes.cardCategoryWhite}>
              Enter Patient Details
            </p>
          </CardHeader>
          <CardBody>
            <div class="patContainer">
              <div class="tableOuter">
                <div class="patBody">
                  <div class="patColumn">
                    <div class="patRow">
                      <input type="text" placeholder="Enter First Name" class="patInput"/>
                      <input type="text" placeholder="Enter Last Name" class="patInput"/>
                      <input type="text" placeholder="Enter Age" class="patInput"/>
                    </div>
                    <div class="patRow">
                      <select class="patInput">
                        <option class="opt">Select County...</option>
                        <option value="Baringo">Baringo</option>
                        <option value='Bomet'>Bomet</option>
                        <option value='Bungoma'>Bungoma</option>
                        <option value='Busia'>Busia</option>
                        <option value='Elgeyo-Marakwet'>Elgeyo-Marakwet</option>
                        <option value='Embu'>Embu</option>
                        <option value='Garissa'>Garissa</option>
                        <option value='Homa Bay'>Homa Bay</option>
                        <option value='Isiolo'>Isiolo</option>
                        <option value='Kajiado'>Kajiado</option>
                        <option value='Kakamega'>Kakamega</option>
                        <option value='Kericho'>Kericho</option>
                        <option value='Kiambu'>Kiambu</option>
                        <option value='Kilifi'>Kilifi</option>
                        <option value='Kirinyaga'>Kirinyaga</option>
                        <option value='Kisii'>Kisii</option>
                        <option value='Kisumu'>Kisumu</option>
                        <option value='Kitui'>Kitui</option>
                        <option value='Kwale'>Kwale</option>
                        <option value='Laikipia'>Laikipia</option>
                        <option value='Lamu'>Lamu</option>
                        <option value='Machakos'>Machakos</option>
                        <option value='Makueni'>Makueni</option>
                        <option value='Mandera'>Mandera</option>
                        <option value='Marsabit'>Marsabit</option>
                        <option value='Meru'>Meru</option>
                        <option value='Migori'>Migori</option>
                        <option value='Mombasa'>Mombasa</option>
                        <option value="Murang'a">Muranga'a</option>
                        <option value='Nairobi City'>Nairobi City</option>
                        <option value='Nakuru'>Nakuru</option>
                        <option value='Nandi'>Nandi</option>
                        <option value='Narok'>Narok</option>
                        <option value='Nyamira'>Nyamira</option>
                        <option value='Nyandarua'>Nyandarua</option>
                        <option value='Nyeri'>Nyeri</option>
                        <option value='Samburu'>Samburu</option>
                        <option value='Siaya'>Siaya</option>
                        <option value='Taita-Taveta'>Taita-Taveta</option>
                        <option value='Tana River'>Tana River</option>
                        <option value='Tharaka-Nithi'>Tharaka-Nithi</option>
                        <option value='Trans Nzoia'>Trans Nzoia</option>
                        <option value='Turkana'>Turkana</option>
                        <option value='Uasin Gishu'>Uasin Gishu</option>
                        <option value='Vihiga'>Vihiga</option>
                        <option value='West Pokot'>West Pokot</option>
                        <option value='wajir'>wajir</option>
                      </select>
                      <input type="text" placeholder="Sub-County" class="patInput"/>
                      <input type="text" placeholder="Village" class="patInput"/>
                    </div>
                    <div class="patRow">
                      <input type="text" placeholder="National ID" class="patInput"/>
                      <input type="text" placeholder="Phone Number" class="patInput"/>
                      <select class="patInput">
                        <option class="opt">Select Gender...</option>
                        <option value="one" class="opt">Male</option>
                        <option value="one" class="opt">Female</option>
                      </select>
                    </div>
                    <div class="patRow">
                      <input type="text" placeholder="Enter Weight" class="patInput"/>
                      <input type="text" placeholder="Enter Height" class="patInput"/>
                      <input type="text" placeholder="Enter Temperature (in degrees celcius)" class="patInput"/>
                    </div>
                    <div class="patRow">
                      <input type="text" placeholder="Enter Blood Pressure" class="patInput"/>
                    </div>
                    <div className="patRow">
                      <button className="patBtn">Submit</button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Register Next of Kin</h4>
            <p className={classes.cardCategoryWhite}>
              Next of Kin Details
            </p>
          </CardHeader>
          <CardBody>
            <div class="patContainer">
              <div class="tableOuter">
                <div class="patBody">
                  <div class="patColumn">
                    <div class="patRow">
                      <input type="text" placeholder="Patient ID" class="patInput"/>
                      <input type="text" placeholder="Enter Kin First Name" class="patInput"/>
                      <input type="text" placeholder="Enter Kin Last Name" class="patInput"/>
                    </div>
                    <div class="patRow">
                      <select class="patInput">
                        <option class="opt">Select Kin County...</option>
                        <option value="Baringo">Baringo</option>
                        <option value='Bomet'>Bomet</option>
                        <option value='Bungoma'>Bungoma</option>
                        <option value='Busia'>Busia</option>
                        <option value='Elgeyo-Marakwet'>Elgeyo-Marakwet</option>
                        <option value='Embu'>Embu</option>
                        <option value='Garissa'>Garissa</option>
                        <option value='Homa Bay'>Homa Bay</option>
                        <option value='Isiolo'>Isiolo</option>
                        <option value='Kajiado'>Kajiado</option>
                        <option value='Kakamega'>Kakamega</option>
                        <option value='Kericho'>Kericho</option>
                        <option value='Kiambu'>Kiambu</option>
                        <option value='Kilifi'>Kilifi</option>
                        <option value='Kirinyaga'>Kirinyaga</option>
                        <option value='Kisii'>Kisii</option>
                        <option value='Kisumu'>Kisumu</option>
                        <option value='Kitui'>Kitui</option>
                        <option value='Kwale'>Kwale</option>
                        <option value='Laikipia'>Laikipia</option>
                        <option value='Lamu'>Lamu</option>
                        <option value='Machakos'>Machakos</option>
                        <option value='Makueni'>Makueni</option>
                        <option value='Mandera'>Mandera</option>
                        <option value='Marsabit'>Marsabit</option>
                        <option value='Meru'>Meru</option>
                        <option value='Migori'>Migori</option>
                        <option value='Mombasa'>Mombasa</option>
                        <option value="Murang'a">Muranga'a</option>
                        <option value='Nairobi City'>Nairobi City</option>
                        <option value='Nakuru'>Nakuru</option>
                        <option value='Nandi'>Nandi</option>
                        <option value='Narok'>Narok</option>
                        <option value='Nyamira'>Nyamira</option>
                        <option value='Nyandarua'>Nyandarua</option>
                        <option value='Nyeri'>Nyeri</option>
                        <option value='Samburu'>Samburu</option>
                        <option value='Siaya'>Siaya</option>
                        <option value='Taita-Taveta'>Taita-Taveta</option>
                        <option value='Tana River'>Tana River</option>
                        <option value='Tharaka-Nithi'>Tharaka-Nithi</option>
                        <option value='Trans Nzoia'>Trans Nzoia</option>
                        <option value='Turkana'>Turkana</option>
                        <option value='Uasin Gishu'>Uasin Gishu</option>
                        <option value='Vihiga'>Vihiga</option>
                        <option value='West Pokot'>West Pokot</option>
                        <option value='wajir'>wajir</option>
                      </select>
                      <input type="text" placeholder="Kin Sub-County" class="patInput"/>
                      <input type="text" placeholder="Kin Village" class="patInput"/>
                    </div>
                    <div class="patRow">
                      <input type="text" placeholder="Kin National ID" class="patInput"/>
                      <input type="text" placeholder="Kin Phone Number" class="patInput"/>
                      <select class="patInput">
                        <option class="opt">Select Kin Gender...</option>
                        <option value="one" class="opt">Male</option>
                        <option value="one" class="opt">Female</option>
                      </select>
                    </div>
                    <div className="patRow">
                      <button className="patBtn">Submit</button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
