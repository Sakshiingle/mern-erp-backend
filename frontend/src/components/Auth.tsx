import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "@/context/User/UserHook";


  function Auth() {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (user) {
      if (user.isVerified) {
        navigate("/home", { replace: true });
      } else {
        navigate("/verify", { replace: true });
      }
    }
  }, [user, loading, navigate]);

  if (loading) return null;

  if (user) return null;

  return (

  
    <div className="flex justify-center mt-12">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Log In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Login />
        </TabsContent>

        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Auth;
