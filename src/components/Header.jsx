import { LogOut } from "react-feather";
import { useAuth } from "../utils/AuthContext.jsx";

const Header = () => {
  const { user, handleUserLogout } = useAuth();

  return (
    <div id={"header--wrapper"}>
      {user ? (
        <>
          Welcome {user.name}
          <LogOut onClick={handleUserLogout} className={"header--link"} />
        </>
      ) : (
        <button>Login</button>
      )}
    </div>
  );
};
export default Header;
