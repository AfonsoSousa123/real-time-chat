import { createContext, useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const contextData = {};

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <CircularProgress color="inherit" /> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
