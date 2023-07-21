import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext.jsx";
import { useEffect, useState } from "react";

const RegisterPage = () => {
  const { user, handleUserRegister } = useAuth();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    name: "",
    password1: "",
    password2: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <>
      <div className={"auth--container"}>
        <div className="form--wrapper">
          <form
            onSubmit={(e) => {
              handleUserRegister(e, credentials);
            }}
          >
            <div className="field--wrapper">
              <label>Email:</label>
              <input
                type={"email"}
                required
                name={"email"}
                placeholder={"Enter your email..."}
                value={credentials.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="field--wrapper">
              <label>Username:</label>
              <input
                type={"text"}
                required
                name={"name"}
                placeholder={"Enter your username..."}
                value={credentials.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="field--wrapper">
              <label>Password:</label>
              <input
                type={"password"}
                required
                name={"password1"}
                placeholder={"Enter your password..."}
                value={credentials.password1}
                onChange={handleInputChange}
              />
            </div>
            <div className="field--wrapper">
              <label>Confirm Password:</label>
              <input
                type={"password"}
                required
                name={"password2"}
                placeholder={"Confirm your password..."}
                value={credentials.password2}
                onChange={handleInputChange}
              />
            </div>
            <div className="field--wrapper">
              <input
                type={"submit"}
                value={"Register"}
                className={"btn btn--lg btn--main"}
              />
            </div>
          </form>

          <p className={""}>
            Already have an account? Login <Link to={"/login"}>here</Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default RegisterPage;
