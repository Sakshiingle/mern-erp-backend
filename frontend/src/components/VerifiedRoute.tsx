import { Navigate, Outlet } from "react-router-dom";
import useUser from "@/context/User/UserHook";

const VerifiedRoute = () => {
  const { user, loading } = useUser();

  // ⏳ wait for user to load from localStorage
  if (loading) return null;

  // 🔒 not logged in
  if (!user) return <Navigate to="/" replace />;

  
 // ⛔ not admin
if (user.role !== "admin") {
  return <Navigate to="/" replace />;
}

// ✅ admin user
return <Outlet />;

};

export default VerifiedRoute;
