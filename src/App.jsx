// import "./App.css";
import Room from "./pages/Room.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import PrivateRoutes from "./components/PrivateRoutes.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/login"} element={<LoginPage />} />

        <Route element={<PrivateRoutes />}>
          <Route path={"/"} element={<Room />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
