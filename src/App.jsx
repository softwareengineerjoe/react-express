import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";

// utils
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  const userRoutes = [{ path: "/", element: <Home /> }];
  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoutes />}>
          {userRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* Catch-all route for non-existing paths */}
        <Route element={<NoPage />} path="*" />
      </Routes>
    </Router>
  );
}

export default App;
