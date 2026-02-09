import { Navigate, Outlet } from "react-router-dom";
import useUser from "@/context/User/UserHook";

const ProtectedRoute = () => {
  const { user } = useUser();

  // Not logged in → go to Auth page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Logged in → allow access
  return <Outlet />;
};

export default ProtectedRoute;
