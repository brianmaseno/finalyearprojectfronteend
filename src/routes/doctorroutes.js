/* eslint-disable */
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import AddIcon from '@material-ui/icons/Add';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PendingIcon from '@mui/icons-material/Pending';
import GppGoodIcon from '@mui/icons-material/GppGood';
import Notifications from "@material-ui/icons/Notifications";
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import FeedbackIcon from '@material-ui/icons/Feedback';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import UserProfile from "views/UserProfile/UserProfile.js";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsPage from "views/Notifications/Notifications.js";
import DoctorDashboard from "views/Doctor/Dashboard/DoctorDashboard";
import CaseNotes from "views/Doctor/CaseNotes/CaseNotes";
import Prescription from "views/Doctor/Prescription/prescription";
import DoctorPendingAppointments from "views/Doctor/PendingAppointments/pendingappointments";
import DoctorApprovedAppointments from "views/Doctor/ApprovedAppointments/approvedappointments";
import RequestLabTest from "views/Doctor/LabResults/requestlabresults";
import DoctorLabTestResults from "views/Doctor/LabResults/labresults";
import DoctorAvailability from "views/Doctor/Availability/availability";
import FindInPageIcon from '@mui/icons-material/FindInPage';
import RetrieveCaseNotes from "views/Doctor/RetrieveCaseNotes/retrieveCaseNotes";

const DoctorRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "Dashboard",
    icon: Dashboard,
    component: DoctorDashboard,
    layout: "/doctor",
  },
  {
    path: "/casenotes",
    name: "Add Case Notes",
    rtlName: "Add Case Notes",
    icon: AddIcon,
    component: CaseNotes,
    layout: "/doctor",
  },
  {
    path: "/retrievecasenotes",
    name: "Retrieve Case Notes",
    rtlName: "Retrieve Case Notes",
    icon: FindInPageIcon,
    component: RetrieveCaseNotes,
    layout: "/doctor",
  },
  {
    path: "/availability",
    name: "Doctor Availability",
    rtlName: "Doctor Availability",
    icon: AccessTimeIcon,
    component: DoctorAvailability,
    layout: "/doctor",
  },
  {
    path: "/pendingappointments",
    name: "Pending Appointment",
    rtlName: "Pending Appointment",
    icon: PendingIcon,
    component: DoctorPendingAppointments,
    layout: "/doctor",
  },
  {
    path: "/approvedappointments",
    name: "Approved Appointment",
    rtlName: "Approved Appointment",
    icon: GppGoodIcon,
    component: DoctorApprovedAppointments,
    layout: "/doctor",
  },
  {
    path: "/labtests",
    name: "Request LabTest",
    rtlName: "Request LabTest",
    icon: LiveHelpIcon,
    component: RequestLabTest,
    layout: "/doctor",
  },
  {
    path: "/labtestresults",
    name: "LabTest Results",
    rtlName: "LabTest Results",
    icon: FeedbackIcon,
    component: DoctorLabTestResults,
    layout: "/doctor",
  },
  {
    path: "/prescription",
    name: "Prescription",
    rtlName: "Prescription",
    icon: AssignmentReturnedIcon,
    component: Prescription,
    layout: "/doctor",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/doctor",
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/doctor",
  },
  {
    path: "/logout",
    name: "Log Out",
    rtlName: "User Profile",
    icon: ExitToAppIcon,
    component: UserProfile,
    layout: "/login",
  },
];

export default DoctorRoutes;
