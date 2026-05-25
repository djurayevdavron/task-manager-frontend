import {BrowserRouter,Routes,Route,Navigate,} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Forbidden from "./pages/Forbidden";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import NotFound
from "./pages/NotFound";
import ServerError
from "./pages/ServerError";

function App() {

  const token = localStorage.getItem(
      "accessToken"
    );
  return (
    <BrowserRouter>

      <Routes>
        <Route
          path="/"
          element={
          token
            ? <Navigate to="/dashboard" />
            : <Navigate to="/login" />
          }
      />
        <Route
          path="/login"
          element={
            token
              ? <Navigate to="/dashboard" />
              : <Login />
          }
        />
        <Route
          path="/register"
          element={
            token
              ? <Navigate to="/dashboard" />
              : <Register />
          }
        />
        <Route
          path="/verify-otp"
          element={
            token
              ? <Navigate to="/dashboard" />
              : <VerifyOtp />
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <AdminRoute>
                <Users />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/403"
          element={<Forbidden />}
        />
        <Route
          path="/500"
          element={<ServerError />}
        />
        <Route
           path="*"
           element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;