import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/LoginPage";
import { UserDashboard } from "./pages/UserDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Signup } from "./pages/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UnAuthorized from "./pages/Unauthorized";
import NotFoundPage from "./pages/404";
const router = createBrowserRouter([
  { path: "/", element: <Login /> },

  {
    path: "dashboard",
    element: (
      <ProtectedRoute allowedRole="user">
        <UserDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute allowedRole="admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "/unauthorized",
    element: <UnAuthorized />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
export default router;
