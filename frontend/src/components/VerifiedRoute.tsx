import { Navigate, Outlet } from "react-router-dom";
import useUser from "@/context/User/UserHook";

const VerifiedRoute = () => {
  const { user, loading } = useUser();

  // ⏳ wait for user to load from localStorage
  if (loading) return null;

  // 🔒 not logged in
  if (!user) return <Navigate to="/" replace />;

  // 📩 logged in but not verified
  if (!user.isVerified) return <Navigate to="/verify" replace />;

  // ✅ verified user
  return <Outlet />;
};

export default VerifiedRoute;
