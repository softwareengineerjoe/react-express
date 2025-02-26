import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import CreateAccount from "./pages/auth/CreateAccount";
import NoPage from "./pages/NoPage";
import Dashboard from "./pages/Dashboard";

// utils
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  const userRoutes = [{ path: "/", element: <Home /> }];
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Login route */}
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoutes />}>
            {userRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>

          {/* Catch-all route for non-existing paths */}
          <Route element={<NoPage />} path="*" />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
