import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import FoodPrice from "./pages/food-Price"
import RickshawFare from "./pages/RickshawFare"
import Notice from "./pages/Notices"
import Bus from "./pages/busshedule"
import Clubs from "./pages/clubs"
import LostAndFound from "./pages/lostandfound";
import EmergencyContact from "./pages/emergency";
import ProtectedRoute from "./components/ProtectedRoute";

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
          path="/dashboard/busshedule"
          element={
            <ProtectedRoute>
              < Bus/>
            </ProtectedRoute>
          }
        />

         {/* <Route
          path="/dashboard/lostandfound"
          element={
            <ProtectedRoute>
              < LostAndFound/>
            </ProtectedRoute>
          }
        /> */}
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