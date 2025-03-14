import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import NewTask from "./pages/NewTask";
import Login from "./pages/auth/Login";
import CreateAccount from "./pages/auth/CreateAccount";
import NoPage from "./pages/NoPage";

// utils
import PrivateRoutes from "./utils/PrivateRoutes";
import ViewTask from "./pages/ViewTask";
import EditTask from "./pages/EditTask";
import { TaskProvider } from "./context/TaskContext";

function App() {
  const userRoutes = [
    { path: "/home", element: <Home /> },
    { path: "/home/new-task", element: <NewTask /> },
    { path: "/home/view-task/:taskId", element: <ViewTask /> },
    { path: "/home/view-task/edit-task/:taskId", element: <EditTask /> },
  ];

  return (
    <UserProvider>
      <TaskProvider>
        <Router>
          <Routes>
            {/* Redirect root route to /home */}
            <Route path="/" element={<Navigate to="/home" />} />

            {/* Login route */}
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<CreateAccount />} />

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
      </TaskProvider>
    </UserProvider>
  );
}

export default App;
