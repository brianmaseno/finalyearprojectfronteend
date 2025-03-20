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
import PharmacistDashboard from "views/Pharmacy/Dashboard/PharmacistDashboard";
import PrescribedDrugs from "views/Pharmacy/PrescribedDrugs/PrescribedDrugs";
//import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
//import RTLPage from "views/RTLPage/RTLPage.js";

const PharmacistRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: PharmacistDashboard,
    layout: "/pharmacist",
  },
  {
    path: "/prescribeddrugs",
    name: "Prescribed Drugs",
    rtlName: "إخطارات",
    icon: "error",
    component: PrescribedDrugs,
    layout: "/pharmacist",
  },
  {
    path: "/dispenseddrugsreports",
    name: "Dispensed Drugs",
    rtlName: "إخطارات",
    icon: "error",
    component: SuspendedAccounts,
    layout: "/pharmacist",
  },
  {
    path: "/drugreports",
    name: "Drugs Report",
    rtlName: "إخطارات",
    icon: "error",
    component: SuspendedAccounts,
    layout: "/pharmacist",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/pharmacist",
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/pharmacist",
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

export default PharmacistRoutes;
