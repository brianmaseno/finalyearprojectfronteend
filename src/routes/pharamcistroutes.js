/* eslint-disable */
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import MedicationIcon from '@mui/icons-material/Medication';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UserProfile from "views/UserProfile/UserProfile.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import PharmacistDashboard from "views/Pharmacy/Dashboard/PharmacistDashboard";
import PrescribedDrugs from "views/Pharmacy/PrescribedDrugs/PrescribedDrugs";
import DrugReports from "views/Reports/Drugs/drugreport";
import DispensedDrugs from "views/Pharmacy/DispensedDrugs/dispenseddrugs";
import AddDrugs from "views/Pharmacy/AddDrug/addDrug";
import ManageInventory from "views/Pharmacy/ManageInventory/manageinventory";

const PharmacistRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "Dashboard",
    icon: Dashboard,
    component: PharmacistDashboard,
    layout: "/pharmacist",
  },
  {
    path: "/adddrugs",
    name: "Add Drugs",
    rtlName: "Add Drugs",
    icon: AddIcon,
    component: AddDrugs,
    layout: "/pharmacist",
  },
  {
    path: "/updatedrug",
    name: "Manage Drugs",
    rtlName: "Manage Drugs",
    icon: UpdateIcon,
    component: ManageInventory,
    layout: "/pharmacist",
  },
  {
    path: "/prescribeddrugs",
    name: "Prescribed Drugs",
    rtlName: "Prescribed Drugs",
    icon: MedicationIcon,
    component: PrescribedDrugs,
    layout: "/pharmacist",
  },
  {
    path: "/dispenseddrugsreports",
    name: "Dispensed Drugs",
    rtlName: "Dispensed Drugs",
    icon: LocalPharmacyIcon,
    component: DispensedDrugs,
    layout: "/pharmacist",
  },
  {
    path: "/drugreports",
    name: "Drugs Report",
    rtlName: "Drugs Report",
    icon: MedicalServicesIcon,
    component: DrugReports,
    layout: "/pharmacist",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/pharmacist",
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/pharmacist",
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

export default PharmacistRoutes;
