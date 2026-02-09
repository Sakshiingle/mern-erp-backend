import { useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { createContext, useContext, useState } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

type DecodedToken = {
  _id: string;
  name: string;
  email: string;
  role: string;
  exp: number;
};


type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);

      // Optional: check expiry
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        setUser(null);
      } else {
        setUser({
          _id: decoded._id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
        });
      }
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    }
  }
}, []);


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
