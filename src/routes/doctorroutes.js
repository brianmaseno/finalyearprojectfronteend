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
import DoctorDashboard from "views/Doctor/Dashboard/DoctorDashboard";
import CaseNotes from "views/Doctor/CaseNotes/CaseNotes";
//import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
//import RTLPage from "views/RTLPage/RTLPage.js";

const DoctorRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DoctorDashboard,
    layout: "/doctor",
  },
  {
    path: "/casenotes",
    name: "Add Case Notes",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: CaseNotes,
    layout: "/doctor",
  },
  {
    path: "/availability",
    name: "Doctor Availability",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: TypographyPage,
    layout: "/doctor",
  },
  {
    path: "/pendingappointments",
    name: "Pending Appointment",
    rtlName: "الرموز",
    icon: "check",
    component: TypographyPage,
    layout: "/doctor",
  },
  {
    path: "/approvedappointments",
    name: "Approved Appointment",
    rtlName: "خرائط",
    icon: "pending",
    component: TypographyPage,
    layout: "/doctor",
  },
  {
    path: "/labtests",
    name: "Request LabTest",
    rtlName: "إخطارات",
    icon: "error",
    component: TypographyPage,
    layout: "/doctor",
  },
  {
    path: "/labtestresults",
    name: "LabTest Results",
    rtlName: "إخطارات",
    icon: "error",
    component: TypographyPage,
    layout: "/doctor",
  },
  {
    path: "/prescription",
    name: "Prescription",
    rtlName: "إخطارات",
    icon: "error",
    component: NotificationsPage,
    layout: "/doctor",
  },
  {
    path: "/reports",
    name: "Reports",
    rtlName: "إخطارات",
    icon: "error",
    component: NotificationsPage,
    layout: "/doctor",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/doctor",
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/doctor",
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

export default DoctorRoutes;
