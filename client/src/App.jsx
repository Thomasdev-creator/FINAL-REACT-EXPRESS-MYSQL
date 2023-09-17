import Dashboard from "./Dashboard/DashboardPage/Dashboard";
import "./index.css";

import Login from "./frontend/LoginPage/Login";
import Signup from "./frontend/SignupPage/Signup";
import HomePage from "./frontend/HomePage/HomePage";
import DetailsPage from "./frontend/DetailsPage/Details";
import AboutPage from "./frontend/AboutPage/About";
import Sals from "./Dashboard/DashboardPage/Sals";

// Import de React router dom
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SideMenu from "./Dashboard/SideMenu/SideMenu";
import VehiclesPage from "./Dashboard/DashboardPage/VehiclesPage";
// import Subscribers from "./Dashboard/DashboardPage/Subscribers";
import Employes from "./Dashboard/DashboardPage/Employes";
import AddCar from "./Dashboard/DashboardPage/AddCar";
import AddEmploye from "./Dashboard/DashboardPage/AddEmploye";
import CarDetails from "./Dashboard/DashboardPage/carDetails";
import EditCar from "./Dashboard/DashboardPage/editCar";
import SalDetails from "./Dashboard/DashboardPage/salDetails";
import EditEmploye from "./Dashboard/DashboardPage/EditEmploye";
import Settings from "./Dashboard/DashboardPage/Settings";
import StaffLogin from "./frontend/LoginPage/StaffLogin";

const DashboardLayout = () => {
  return (
    <div className="OutletCSS flex">
      <SideMenu />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([

  {
    path: "/",
    element: (
      <div>
        <HomePage />
      </div>
    ),
  },
  {
    path: "/about",
    element: (
      <div>
        <AboutPage />
      </div>
    ),
  },
  {
    path: "/details/:id",
    element: (
      <div>
        <DetailsPage />
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/staffLogin",
    element: (
      <div>
        <StaffLogin />
      </div>
    ),
  },
  {
    path: "/signup",
    element: (
      <div>
        <Signup />
      </div>
    ),
  },

  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/sals",
        element: <Sals />
      },
      {
        path: "/vehiclesPage",
        element: <VehiclesPage />
      },
      // {
      //   path: "/subscribers",
      //   element: <Subscribers />
      // },
      {
        path: "/employes",
        element: <Employes />
      },
      {
        path: "/addCar",
        element: <AddCar />
      },
      {
        path: "/addEmploye",
        element: <AddEmploye />
      },
      {
        path: "/carDetails/:id",
        element: <CarDetails />
      },
      {
        path: "/editCar/:id",
        element: <EditCar />
      },
      {
        path: "/salDetails/:id",
        element: <SalDetails />
      },
      {
        path: "/editEmploye/:id",
        element: <EditEmploye />
      },
      {
        path: "/settings",
        element: <Settings />
      }
    ],
  },
  
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
