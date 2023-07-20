// import "./App.css";
import Room from "./pages/Room.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import { AuthProvider } from "./utils/AuthContext.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path={"/login"} element={<LoginPage />} />

          <Route element={<PrivateRoutes />}>
            <Route path={"/"} element={<Room />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
