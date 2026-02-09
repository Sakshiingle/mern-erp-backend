import React, { useEffect, useState } from "react";
import UserContext, { User } from "./UserContext";

type Props = {
  children: React.ReactNode;
};

const UserProvider = ({ children }: Props) => {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user once on app start
  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) {
      try {
        setUserState(JSON.parse(raw));
      } catch {
        localStorage.removeItem("user");
        setUserState(null);
      }
    }
    setLoading(false);
  }, []);

  const setUser = (u: User | null) => {
    if (u) {
      localStorage.setItem("user", JSON.stringify(u));
      setUserState(u);
    } else {
      localStorage.removeItem("user");
      setUserState(null);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
