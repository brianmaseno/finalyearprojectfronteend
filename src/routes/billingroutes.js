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
import BillingDashboard from "views/Billing/Dashboard/BillingDashboard";
import MakePayment from "views/Billing/Payments/MakePayment";
import BillingReports from "views/Reports/Billing/billingreports";
//import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
//import RTLPage from "views/RTLPage/RTLPage.js";

const BillingRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: BillingDashboard,
    layout: "/billing",
  },
  {
    path: "/makepayment",
    name: "Make Payment",
    rtlName: "إخطارات",
    icon: "error",
    component: MakePayment,
    layout: "/billing",
  },
  {
    path: "/billingreports",
    name: "Billing Reports",
    rtlName: "إخطارات",
    icon: "error",
    component: BillingReports,
    layout: "/billing",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/billing",
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/billing",
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

export default BillingRoutes;
