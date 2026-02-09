// frontend/src/components/Signup.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import PwdInput from "./PwdInput";
import { LoaderCircle } from "lucide-react";

import api from "@/lib/api";
import useUser from "@/context/User/UserHook";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [match, setMatch] = useState<0 | 1 | 2>(0);
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!pwd || !confirmPwd) {
      setMatch(0);
      return;
    }
    setMatch(pwd === confirmPwd && pwd.length >= 4 ? 1 : 2);
  }, [pwd, confirmPwd]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || match !== 1) return;

    try {
      setIsLoading(true);

      const res = await api.post("/auth/register", {
        name,
        email,
        password: pwd,
      });

      const newUser = res.data.user;
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);

      // ERP flow expects verification step first
      navigate("/verify");
    } catch (err) {
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Sign up to get started. We’ll send a verification code.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleRegister}>
        <CardContent className="space-y-2">
          <div>
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div>
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <PwdInput id="password" name="Password" pwd={pwd} setPwd={setPwd} match={match} />
          <PwdInput id="confirmPassword" name="Confirm Password" pwd={confirmPwd} setPwd={setConfirmPwd} match={match} />
        </CardContent>

        <CardFooter>
          <Button className="w-full" disabled={isLoading}>
            {isLoading ? <LoaderCircle className="spinner" /> : "Sign Up!"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Signup;
