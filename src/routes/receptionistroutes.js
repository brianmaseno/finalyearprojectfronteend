/* eslint-disable */
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import AddIcon from '@mui/icons-material/Add';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PendingIcon from '@mui/icons-material/Pending';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import GppGoodIcon from '@mui/icons-material/GppGood';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SummarizeIcon from '@mui/icons-material/Summarize';
import UserProfile from "views/UserProfile/UserProfile.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import ReceptionistDashboard from "views/Receptionist/Dashboard/ReceptionistDashboard";
import AddPatient from "views/Receptionist/Patient/AddPatient";
import FindPatient from "views/Receptionist/Patient/FindPatient";
import BookAppointment from "views/Receptionist/Appointments/appointments";
import PendingAppointments from "views/Receptionist/Appointments/pendingappointments";
import ApprovedAppointments from "views/Receptionist/Appointments/approvedappointments";
import TreatmentReports from "views/Reports/Treatment/treatmentreport";

const ReceptionistRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "Dashboard",
    icon: Dashboard,
    component: ReceptionistDashboard,
    layout: "/receptionist",
  },
  {
    path: "/patientregistration",
    name: "Add Patient",
    rtlName:  "Add Patient",
    icon: AddIcon,
    component: AddPatient,
    layout: "/receptionist",
  },
  {
    path: "/searchpatient",
    name: "Find Patient",
    rtlName: "Find Patient",
    icon: PersonSearchIcon,
    component: FindPatient,
    layout: "/receptionist",
  },
  {
    path: "/bookappointment",
    name: "Book Appointment",
    rtlName: "Book Appointment",
    icon: BookOnlineIcon,
    component: BookAppointment,
    layout: "/receptionist",
  },
  {
    path: "/allpendingappointments",
    name: "Pending Appointment",
    rtlName: "Pending Appointment",
    icon: PendingIcon,
    component: PendingAppointments,
    layout: "/receptionist",
  },
  {
    path: "/allapprovedappointments",
    name: "Approved Appointment",
    rtlName: "Approved Appointment",
    icon: GppGoodIcon,
    component: ApprovedAppointments,
    layout: "/receptionist",
  },
  {
    path: "/treatmentreports",
    name: "Treatment Reports",
    rtlName: "Treatment Reports",
    icon: SummarizeIcon,
    component: TreatmentReports,
    layout: "/receptionist",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/receptionist",
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/receptionist",
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

export default ReceptionistRoutes;
