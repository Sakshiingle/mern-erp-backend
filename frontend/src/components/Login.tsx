import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "@/context/User/UserHook";
import { loginUser } from "@/lib/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !pwd) return;

    try {
      setIsLoading(true);

  const res = await loginUser(email, pwd);

  // Backend returns { user: {...} }
  const backendUser = res.user;

  // Normalize user for frontend
  const normalizedUser = {
    _id: backendUser._id,
    name: backendUser.name,
    email: backendUser.email,
    role: backendUser.role,
    token: backendUser.token,
  };

  setUser(normalizedUser);

  // Week 4: no verification yet → go home
  navigate("/home");
} catch (error) {
  console.error("Login failed:", error);
  alert("Invalid email or password");
} finally {
  setIsLoading(false);
}

  };

  return (
    <form onSubmit={handleLogin} className="space-y-3 max-w-sm mx-auto mt-10">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-black text-white p-2 rounded"
      >
        {isLoading ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
};

export default Login;
