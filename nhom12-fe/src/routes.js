
// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import NotFound from "layouts/authentication/not-found";
import Home from "views/client/home";
import ManageUser from "views/admin/manage-user";
import ManageContinents from "views/admin/manage-continents";
import ManageCountries from "views/admin/manage-countries";
import ManageTourType from "views/admin/manage-category";
import Destination from "views/client/destination";


// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import ManageDestination from "./views/admin/manage-destination";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,    
    isMenu: true,
  },
  { type: "title", title: "Quản lý nội dung", key: "sumary-content", isMenu: true, },
  {
    type: "collapse",
    name: "Quản lý điểm đến",
    key: "manage-destination",
    route: "/manage-destination",
    icon: <Office size="12px" />,
    component: <ManageDestination />,
    noCollapse: true,
    isMenu: true,
  },
  { type: "title", title: "Danh mục", key: "sumary", isMenu: true, },
  {
    type: "collapse",
    name: "Quản lý tài khoản",
    key: "manage-user",
    route: "/manage-user",
    icon: <Office size="12px" />,
    component: <ManageUser />,
    noCollapse: true,
    isMenu: true,
  },
  {
    type: "collapse",
    name: "Quản lý lục địa",
    key: "manage-continents",
    route: "/manage-continents",
    icon: <Office size="12px" />,
    component: <ManageContinents />,
    noCollapse: true,
    isMenu: true,
  },
  {
    type: "collapse",
    name: "Danh mục địa chỉ",
    key: "manage-countries",
    route: "/manage-countries",
    icon: <Office size="12px" />,
    component: <ManageCountries />,
    noCollapse: true,
    isMenu: true,
  },
  {
    type: "collapse",
    name: "Loại hình du lịch",
    key: "manage-tourtype",
    route: "/manage-tourtype",
    icon: <Office size="12px" />,
    component: <ManageTourType />,
    noCollapse: true,
    isMenu: true,
  },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   route: "/tables",
  //   icon: <Office size="12px" />,
  //   component: <Tables />,
  //   noCollapse: true,
  //   isMenu: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   route: "/billing",
  //   icon: <CreditCard size="12px" />,
  //   component: <Billing />,
  //   noCollapse: true,
  //   isMenu: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Virtual Reality",
  //   key: "virtual-reality",
  //   route: "/virtual-reality",
  //   icon: <Cube size="12px" />,
  //   component: <VirtualReality />,
  //   noCollapse: true,
  //   isMenu: true,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   route: "/rtl",
  //   icon: <Settings size="12px" />,
  //   component: <RTL />,
  //   noCollapse: true,
  //   isMenu: true,
  // },
  { type: "title", title: "Account Pages", key: "account-pages", isMenu: true, },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,    
    isMenu: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,    
    isMenu: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: true,    
    isMenu: true,
  },
  {
    type: "collapse",
    name: "Home",
    key: "home",
    route: "/",
    icon: <SpaceShip size="12px" />,
    component: <Home />,
    noCollapse: true,    
    isMenu: false,
  },
  {
    type: "collapse",
    name: "Destination",
    key: "destination",
    route: "/destination",
    icon: <SpaceShip size="12px" />,
    component: <Destination />,
    noCollapse: true,    
    isMenu: false,
  },
  {
    type: "collapse",
    name: "Not Found",
    key: "not-found",
    route: "/not-found",
    icon: <SpaceShip size="12px" />,
    component: <NotFound />,
    noCollapse: true,    
    isMenu: false,
  },
];
const publicRoutes = [
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,    
    isMenu: false,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,    
    isMenu: false,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: true,    
    isMenu: false,
  },
]
export  {routes, publicRoutes};
