import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import AcademicBuilding from "./pages/AcademicBuilding"
import Dashboard from "./pages/dashboard";
import FoodPrice from "./pages/food-Price"
import RickshawFare from "./pages/RickshawFare"
import Notice from "./pages/Notices"
import Bus from "./pages/busroute"
import Clubs from "./pages/clubs"
import Events from "./pages/events"
import EmergencyContact from "./pages/emergency";
import ProtectedRoute from "./components/ProtectedRoute";
import BusSchedule from "./pages/busshedule";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
          <Route
          path="/dashboard/buildings"
          element={
            <ProtectedRoute>
              <AcademicBuilding/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/foodprice"
          element={
            <ProtectedRoute>
              < FoodPrice />
            </ProtectedRoute>
          }
        />
          <Route
          path="/dashboard/clubs"
          element={
            <ProtectedRoute>
              <Clubs />
            </ProtectedRoute>
          }
        />
          <Route
          path="/dashboard/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />

         <Route
          path="/dashboard/rickshawfare"
          element={
            <ProtectedRoute>
              <RickshawFare />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/notice"
          element={
            <ProtectedRoute>
              < Notice/>
            </ProtectedRoute>
          }
        />

         <Route
          path="/dashboard/busroute"
          element={
            <ProtectedRoute>
              < Bus/>
            </ProtectedRoute>
          }
        />
         <Route
          path="/dashboard/busshedule"
          element={
            <ProtectedRoute>
              < BusSchedule/>
            </ProtectedRoute>
          }
        />

         <Route
          path="/dashboard/emergency"
          element={
            <ProtectedRoute>
              < EmergencyContact/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;