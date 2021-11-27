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
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: PharmacistDashboard,
    layout: "/pharmacist",
  },
  {
    path: "/adddrugs",
    name: "Add Drugs",
    rtlName: "إخطارات",
    icon: AddIcon,
    component: AddDrugs,
    layout: "/pharmacist",
  },
  {
    path: "/updatedrug",
    name: "Manage Drugs",
    rtlName: "إخطارات",
    icon: UpdateIcon,
    component: ManageInventory,
    layout: "/pharmacist",
  },
  {
    path: "/prescribeddrugs",
    name: "Prescribed Drugs",
    rtlName: "إخطارات",
    icon: MedicationIcon,
    component: PrescribedDrugs,
    layout: "/pharmacist",
  },
  {
    path: "/dispenseddrugsreports",
    name: "Dispensed Drugs",
    rtlName: "إخطارات",
    icon: LocalPharmacyIcon,
    component: DispensedDrugs,
    layout: "/pharmacist",
  },
  {
    path: "/drugreports",
    name: "Drugs Report",
    rtlName: "إخطارات",
    icon: MedicalServicesIcon,
    component: DrugReports,
    layout: "/pharmacist",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/pharmacist",
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/pharmacist",
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

export default PharmacistRoutes;
