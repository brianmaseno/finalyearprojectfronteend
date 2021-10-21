/* eslint-disable */
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
//import BubbleChart from "@material-ui/icons/BubbleChart";
//import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";

//import Unarchive from "@material-ui/icons/Unarchive";
//import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import SuspendedAccounts from "views/SuspendedAccounts/SuspendedAccounts";
import EditAccounts from "views/EditAccounts/EditAccounts";
import LabDashboard from "views/Lab/Dashboard/LabDashboard";
import LabRequests from "views/Lab/Requests/LabRequests";
import LabReports from "views/Reports/Lab/labreports";
import TestServices from "views/Lab/TestServices/testservices";
import TestResults from "views/Lab/TestResults/testresults";
//import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
//import RTLPage from "views/RTLPage/RTLPage.js";

const LabRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: LabDashboard,
    layout: "/lab",
  },
  {
    path: "/labrequests",
    name: "Lab Requests",
    rtlName: "إخطارات",
    icon: "error",
    component: LabRequests,
    layout: "/lab",
  },
  {
    path: "/addtestresult",
    name: "Add Test Result",
    rtlName: "إخطارات",
    icon: "error",
    component: TestResults,
    layout: "/lab",
  },
  {
    path: "/testservices",
    name: "Test Services",
    rtlName: "إخطارات",
    icon: "error",
    component: TestServices,
    layout: "/lab",
  },
  {
    path: "/labtestreports",
    name: "Test Reports",
    rtlName: "إخطارات",
    icon: "error",
    component: LabReports,
    layout: "/lab",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/lab",
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/lab",
  },
  {
    path: "/logout",
    name: "Log Out",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "logout",
    component: UserProfile,
    layout: "/login",
  },
];

export default LabRoutes;
