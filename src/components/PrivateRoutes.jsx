import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/AuthContext.jsx";

const PrivateRoutes = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState();
  const { user } = useAuth();

  return <>{user ? <Outlet /> : <Navigate to={"/login"} />}</>;
};
export default PrivateRoutes;
