import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

export default function Login() {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [alertMessage, setAlertMessage] = useState("");
  let nevigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const userJson = JSON.stringify({
      email: userDetails.email,
      password: userDetails.password,
    });
    try {
      const result = await fetch("https://myfood-mern.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userJson,
      });

      const jsonResult = await result.json();

      if (!jsonResult.success) {
        setAlertMessage(jsonResult.message);
      } else {
        localStorage.setItem("auth-token", jsonResult.token);
        localStorage.setItem("userId", jsonResult.userId);
        nevigate("/");
      }
    } catch (error) {
      setAlertMessage("Sorry!!! Internal Server Error.");
    }
  };

  const closeAlert = () => {
    setAlertMessage("");
  };

  const handleChange = (event) => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Alert message={alertMessage} type="danger" onClose={closeAlert} />

      <div className="position-relative">
        <div className="container">
          <div className="row no-gutter">
            <div
              className="col-md-6 d-none d-md-flex rounded-5"
              style={{
                backgroundImage: `URL("/assets/images/other/login.jpg")`,
                height: "33rem",
                width: "41rem",
              }}
            ></div>

            <div className="col-md-6">
              <div
                className="login d-flex align-items-center py-5 my-5"
                style={{ zIndex: "10" }}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-lg-10 col-xl-7 mx-auto">
                      <h3 className="display-4">Login</h3>
                      <p className="text-muted mb-4"></p>
                      <form onSubmit={handleLogin}>
                        <div className="form-group mb-3">
                          <input
                            id="inputEmail"
                            type="email"
                            name="email"
                            value={userDetails.email}
                            onChange={handleChange}
                            placeholder="Email address"
                            required
                            autoFocus=""
                            className="form-control rounded-pill border-0 shadow-sm px-4"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            id="inputPassword"
                            type="password"
                            name="password"
                            value={userDetails.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                            className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                          />
                        </div>
                        <div className="custom-control custom-checkbox mb-3">
                          <input
                            id="customCheck1"
                            type="checkbox"
                            className="custom-control-input"
                          />
                          <label
                            htmlFor="customCheck1"
                            className="custom-control-label"
                          >
                            Remember password
                          </label>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-block text-uppercase mb-2 rounded-4 shadow-sm"
                        >
                          Sign in
                        </button>
                        <p className="d-inline ms-3">
                          Do not have an account?{" "}
                          <Link to="/signup">Sign Up</Link>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
