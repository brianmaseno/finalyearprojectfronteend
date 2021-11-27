/*eslint-disable*/
import React, {useState, useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useNotification } from "hooks/useNotifications";
import ProjectLoading from "components/Loading/projectloading";

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

export default function Notifications() {
  const classes = useStyles();
  const { notifications } = useNotification();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [])

  return (
    <>
    <div className="pathCont">
      <div className="path">
        <p className="pathName">Dashboard / <span>Notifications</span></p>
      </div>
    </div>
    <GridContainer>
      <Card>
        <CardHeader color="info">
          <h4 className={classes.cardTitleWhite}>Notifications</h4>
        </CardHeader>
        <CardBody>
          {!loading ? 
          <>
          {notifications.length > 0 ?
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              {notifications ? notifications.map((item) => (
                <SnackbarContent message={item.message} />
              )) : null}
            </GridItem>
          </GridContainer>
          :
          <div className="noData">
            <p className="txtNo">No Notifications</p>
          </div> 
          }
          </>
          :
          <div className="load">
            <ProjectLoading type="spinningBubbles" color="#11b8cc" height="30px" width="30px"/>
          </div>
          }
        </CardBody>
      </Card>
    </GridContainer>
    </>
  );
}
