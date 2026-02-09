import { Route, Routes } from "react-router-dom";
import Auth from "@/components/Auth";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { VerificationForm } from "@/components/VerificationForm";
import { Toaster } from "@/components/ui/toaster";
import PrivateRoute from "@/components/PrivateRoute";
import VerifiedRoute from "@/components/VerifiedRoute";
import ChangeEmailVerification from "@/components/ChangeEmailVerification";
import ForgetPwd from "@/components/ForgetPwd";
import ResetPwd from "@/components/ResetPwd";
import Home from "@/components/Home";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Header />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Auth />} />
        <Route path="/password/forget" element={<ForgetPwd />} />
        <Route path="/password/verify/:email/:token" element={<ResetPwd />} />

        {/* Logged-in but not verified */}
        <Route element={<PrivateRoute />}>
          <Route path="/verify" element={<VerificationForm />} />

          {/* Logged-in & verified */}
          <Route element={<VerifiedRoute />}>
            <Route path="/email/verify/:token" element={<ChangeEmailVerification />} />
            <Route path="/home" element={<Home />} />
          </Route>
        </Route>
      </Routes>

      <Toaster />
    </ThemeProvider>
  );
}

export default App;
