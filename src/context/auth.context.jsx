import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import userService, {
  getUser,
  loginUser,
  logOut,
} from "../services/usersService";

const authContext = createContext(null);
authContext.displayName = "auth-context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());

  const refreshUser = () => setUser(getUser());

  const login = async (Credentials) => {
    const response = await loginUser(Credentials);
    refreshUser();

    return response;
  };

  const logout = () => {
    userService.logOut();
    refreshUser();
  };

  return (
    <authContext.Provider
      value={{ user, login, logout, createUser: userService.createUser }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
