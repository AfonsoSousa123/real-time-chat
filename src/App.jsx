import Room from "./pages/Room.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import { AuthProvider } from "./utils/AuthContext.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/register"} element={<RegisterPage />} />

          <Route element={<PrivateRoutes />}>
            <Route path={"/"} element={<Room />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
