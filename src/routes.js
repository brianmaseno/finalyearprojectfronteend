/* eslint-disable */
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import AddIcon from '@material-ui/icons/Add';
import Notifications from "@material-ui/icons/Notifications";
import LockIcon from '@mui/icons-material/Lock';
import PendingIcon from '@mui/icons-material/Pending';
import ErrorIcon from '@material-ui/icons/Error';
import GppGoodIcon from '@mui/icons-material/GppGood';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import PendingAccounts from "views/PendingAccounts/PendingAccounts";
import SuspendedAccounts from "views/SuspendedAccounts/SuspendedAccounts";
import EditAccounts from "views/EditAccounts/EditAccounts";
import AddDepartment from "views/Admin/AddDepartment";
import ChangePassword from "views/Admin/UpdatePassword/updatePassword";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName:"Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/activated",
    name: "Activated Accounts",
    rtlName: "Activated Accounts",
    icon: GppGoodIcon,
    component: EditAccounts,
    layout: "/admin",
  },
  {
    path: "/pending",
    name: "Pending Accounts",
    rtlName: "Pending Accounts",
    icon: PendingIcon,
    component: PendingAccounts,
    layout: "/admin",
  },
  {
    path: "/suspended",
    name: "Suspended Accounts",
    rtlName: "Suspended Accounts",
    icon: ErrorIcon,
    component: SuspendedAccounts,
    layout: "/admin",
  },
  {
    path: "/changepassword",
    name: "Change Password",
    rtlName: "Change Password",
    icon: LockIcon,
    component: ChangePassword,
    layout: "/admin",
  },
  {
    path: "/adddepartment",
    name: "Add Department",
    rtlName: "Add Department",
    icon: AddIcon,
    component: AddDepartment,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
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

export default dashboardRoutes;
