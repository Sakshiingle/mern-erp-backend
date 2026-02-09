import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "@/context/User/UserHook";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !pwd) return;

    setIsLoading(true);

    // 🔐 FRONTEND-ONLY DUMMY USER (WEEK 3)
    const dummyUser = {
      name: "Test User",
      email: email,
      isVerified: true,
      token: "dummy-token",
    };

    setUser(dummyUser);

    // redirect
    navigate("/home");

    setIsLoading(false);
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
