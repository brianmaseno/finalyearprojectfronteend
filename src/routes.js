/* eslint-disable */
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import AddIcon from '@material-ui/icons/Add';
import Notifications from "@material-ui/icons/Notifications";
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import PendingAccounts from "views/PendingAccounts/PendingAccounts";
import SuspendedAccounts from "views/SuspendedAccounts/SuspendedAccounts";
import EditAccounts from "views/EditAccounts/EditAccounts";
import AddDepartment from "views/Admin/AddDepartment";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/activated",
    name: "Activated Accounts",
    rtlName: "الرموز",
    icon: "check",
    component: EditAccounts,
    layout: "/admin",
  },
  {
    path: "/pending",
    name: "Pending Accounts",
    rtlName: "خرائط",
    icon: "pending",
    component: PendingAccounts,
    layout: "/admin",
  },
  {
    path: "/suspended",
    name: "Suspended Accounts",
    rtlName: "إخطارات",
    icon: "error",
    component: SuspendedAccounts,
    layout: "/admin",
  },
  {
    path: "/adddepartment",
    name: "Add Department",
    rtlName: "إخطارات",
    icon: AddIcon,
    component: AddDepartment,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
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

export default dashboardRoutes;
