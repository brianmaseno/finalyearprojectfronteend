/* eslint-disable */
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import UserProfile from "views/UserProfile/UserProfile.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import LabDashboard from "views/Lab/Dashboard/LabDashboard";
import LabRequests from "views/Lab/Requests/LabRequests";
import LabReports from "views/Reports/Lab/labreports";
import TestServices from "views/Lab/TestServices/testservices";
import TestResults from "views/Lab/TestResults/testresults";

const LabRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "Dashboard",
    icon: Dashboard,
    component: LabDashboard,
    layout: "/lab",
  },
  {
    path: "/labrequests",
    name: "Lab Requests",
    rtlName: "Lab Requests",
    icon: ContactSupportIcon,
    component: LabRequests,
    layout: "/lab",
  },
  {
    path: "/addtestresult",
    name: "Add Test Result",
    rtlName: "Add Test Result",
    icon: AddIcon,
    component: TestResults,
    layout: "/lab",
  },
  {
    path: "/testservices",
    name: "Test Services",
    rtlName: "Test Services",
    icon: HomeRepairServiceIcon,
    component: TestServices,
    layout: "/lab",
  },
  {
    path: "/labtestreports",
    name: "Test Reports",
    rtlName: "Test Reports",
    icon: TextSnippetIcon,
    component: LabReports,
    layout: "/lab",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/lab",
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/lab",
  },
  {
    path: "/logout",
    name: "Log Out",
    rtlName: "Log Out",
    icon: ExitToAppIcon,
    component: UserProfile,
    layout: "/login",
  },
];

export default LabRoutes;
