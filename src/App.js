import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { HashRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import LoginRoute from "./components/LoginRoute";

function App() {
  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <HashRouter>
            <Routes>
              <Route
                path="/signup"
                element={
                  <LoginRoute>
                    <Signup />
                  </LoginRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <LoginRoute>
                    <Login />
                  </LoginRoute>
                }
              />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/update-profile"
                element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </HashRouter>
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
