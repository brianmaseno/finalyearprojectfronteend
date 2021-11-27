/* eslint-disable */
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Notifications from "@material-ui/icons/Notifications";
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import FeedbackIcon from '@material-ui/icons/Feedback';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import UserProfile from "views/UserProfile/UserProfile.js";
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
    path: "/retrievecasenotes",
    name: "Retrieve Case Notes",
    rtlName: "طباعة",
    icon: FindInPageIcon,
    component: RetrieveCaseNotes,
    layout: "/doctor",
  },
  {
    path: "/availability",
    name: "Doctor Availability",
    rtlName: "طباعة",
    icon: AccessTimeIcon,
    component: DoctorAvailability,
    layout: "/doctor",
  },
  {
    path: "/pendingappointments",
    name: "Pending Appointment",
    rtlName: "الرموز",
    icon: "pending",
    component: DoctorPendingAppointments,
    layout: "/doctor",
  },
  {
    path: "/approvedappointments",
    name: "Approved Appointment",
    rtlName: "خرائط",
    icon: "check",
    component: DoctorApprovedAppointments,
    layout: "/doctor",
  },
  {
    path: "/labtests",
    name: "Request LabTest",
    rtlName: "إخطارات",
    icon: LiveHelpIcon,
    component: RequestLabTest,
    layout: "/doctor",
  },
  {
    path: "/labtestresults",
    name: "LabTest Results",
    rtlName: "إخطارات",
    icon: FeedbackIcon,
    component: DoctorLabTestResults,
    layout: "/doctor",
  },
  {
    path: "/prescription",
    name: "Prescription",
    rtlName: "إخطارات",
    icon: AssignmentReturnedIcon,
    component: Prescription,
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
    component: UserProfile,
    layout: "/login",
  },
];

export default DoctorRoutes;
