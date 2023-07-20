import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState();
  const user = false;

  return <>{user ? <Outlet /> : <Navigate to={"/login"} />}</>;
};
export default PrivateRoutes;
