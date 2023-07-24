import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig.js";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";
import { Backdrop, CircularProgress } from "@mui/material";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserOnLoad();
  }, []);

  const getUserOnLoad = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.info(error);
    }
    setLoading(false);
  };

  const handleUserLogin = async (e, credentials) => {
    e.preventDefault();

    try {
      let response = await account.createEmailSession(
        credentials.email,
        credentials.password,
      );

      const accountDetails = await account.get();
      setUser(accountDetails);

      navigate("/");
    } catch (error) {
      console.info(error);
      alert("Invalid Credentials!");
    }
  };

  const handleUserLogout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };
  const handleUserRegister = async (e, credentials) => {
    e.preventDefault();

    if (credentials.password1 !== credentials.password2) {
      alert("Password do not match!");
    }

    try {
      let response = await account.create(
        ID.unique(),
        credentials.email,
        credentials.password1,
        credentials.name,
      );

      await account.createEmailSession(
        credentials.email,
        credentials.password1,
      );
      const accountDetails = await account.get();
      setUser(accountDetails);
      // console.log(response);

      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const contextData = {
    user,
    handleUserLogin,
    handleUserLogout,
    handleUserRegister,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
