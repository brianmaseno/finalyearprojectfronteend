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
import PendingAccounts from "views/PendingAccounts/PendingAccounts";
import ApprovedAccounts from "views/ApprovedAccounts/ApprovedAccounts";
import SuspendedAccounts from "views/SuspendedAccounts/SuspendedAccounts";
import EditAccounts from "views/EditAccounts/EditAccounts";
import TypographyPage from "views/Typography/Typography";
import ReceptionistDashboard from "views/Receptionist/Dashboard/ReceptionistDashboard";
import AddPatient from "views/Receptionist/Patient/AddPatient";
import FindPatient from "views/Receptionist/Patient/FindPatient";
//import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
//import RTLPage from "views/RTLPage/RTLPage.js";

const ReceptionistRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: ReceptionistDashboard,
    layout: "/receptionist",
  },
  {
    path: "/patientregistration",
    name: "Add Patient",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: AddPatient,
    layout: "/receptionist",
  },
  {
    path: "/searchpatient",
    name: "Find Patient",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: FindPatient,
    layout: "/receptionist",
  },
  {
    path: "/bookappointment",
    name: "Book Appointment",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TypographyPage,
    layout: "/receptionist",
  },
  {
    path: "/allpendingappointments",
    name: "Pending Appointment",
    rtlName: "الرموز",
    icon: "check",
    component: TypographyPage,
    layout: "/receptionist",
  },
  {
    path: "/allapprovedappointments",
    name: "Approved Appointment",
    rtlName: "خرائط",
    icon: "pending",
    component: TypographyPage,
    layout: "/receptionist",
  },
  {
    path: "/billingreports",
    name: "Billing Reports",
    rtlName: "إخطارات",
    icon: "error",
    component: TypographyPage,
    layout: "/receptionist",
  },
  {
    path: "/treatmentreports",
    name: "Treatment Reports",
    rtlName: "إخطارات",
    icon: "error",
    component: TypographyPage,
    layout: "/receptionist",
  },
  {
    path: "/labreports",
    name: "Lab Reports",
    rtlName: "إخطارات",
    icon: "error",
    component: TypographyPage,
    layout: "/receptionist",
  },
  {
    path: "/drugreports",
    name: "Drug Reports",
    rtlName: "إخطارات",
    icon: "error",
    component: TypographyPage,
    layout: "/receptionist",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: TypographyPage,
    layout: "/receptionist",
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: TypographyPage,
    layout: "/receptionist",
  },
  {
    path: "/logout",
    name: "Log Out",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "logout",
    component: TypographyPage,
    layout: "/login",
  },
];

export default ReceptionistRoutes;
