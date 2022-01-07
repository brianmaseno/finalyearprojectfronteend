/* eslint-disable */
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import PaymentIcon from '@mui/icons-material/Payment';
import PaidIcon from '@mui/icons-material/Paid';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UserProfile from "views/UserProfile/UserProfile.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import BillingDashboard from "views/Billing/Dashboard/BillingDashboard";
import MakePayment from "views/Billing/Payments/MakePayment";
import BillingReports from "views/Reports/Billing/billingreports";

const BillingRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "Dashboard",
    icon: Dashboard,
    component: BillingDashboard,
    layout: "/billing",
  },
  {
    path: "/makepayment",
    name: "Make Payment",
    rtlName: "Make Payment",
    icon: PaymentIcon,
    component: MakePayment,
    layout: "/billing",
  },
  {
    path: "/billingreports",
    name: "Billing Reports",
    rtlName: "Billing Reports",
    icon: PaidIcon,
    component: BillingReports,
    layout: "/billing",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/billing",
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/billing",
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

export default BillingRoutes;
