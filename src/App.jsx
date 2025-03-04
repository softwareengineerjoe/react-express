import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import NewTask from "./pages/NewTask";
import Login from "./pages/auth/Login";
import CreateAccount from "./pages/auth/CreateAccount";
import NoPage from "./pages/NoPage";
import Dashboard from "./pages/Dashboard";

// utils
import PrivateRoutes from "./utils/PrivateRoutes";
import ViewTask from "./pages/ViewTask";
import EditTask from "./pages/EditTask";

function App() {
  const userRoutes = [{ path: "/", element: <Dashboard /> }];
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Login route */}
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/home" element={<Home />} />
          <Route path="home/new-task" element={<NewTask />} />
          <Route path="home/view-task/:taskId" element={<ViewTask />} />
          <Route path="home/view-task/edit-task/:taskId" element={<EditTask />} />

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
