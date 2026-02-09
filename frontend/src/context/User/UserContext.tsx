// frontend/src/context/User/UserContext.ts
import { createContext } from "react";

export type User = {
  role: string;
  _id?: string;
  name: string;
  email: string;
  isVerified?: boolean;
  token?: string;
};

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
