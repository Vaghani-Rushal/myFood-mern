import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

export default function Signup() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  let nevigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    const userJson = JSON.stringify({
      name: userDetails.name,
      email: userDetails.email,
      password: userDetails.password,
      address: userDetails.address,
    });
    try {
      const result = await fetch("https://myfood-mern.onrender.com/api/signup", {
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
                backgroundImage: `URL("/assets/images/other/signup.jpg")`,
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
                      <h3 className="display-4">Sign Up</h3>
                      <p className="text-muted mb-4"></p>
                      <form onSubmit={handleSignup}>
                        <div className="form-group mb-3">
                          <input
                            id="inputName"
                            type="text"
                            placeholder="User name"
                            name="name"
                            value={userDetails.name}
                            onChange={handleChange}
                            required
                            autoFocus=""
                            className="form-control rounded-pill border-0 shadow-sm px-4"
                            minLength="3"
                            maxLength="35"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            id="inputEmail"
                            type="email"
                            placeholder="Email address"
                            name="email"
                            value={userDetails.email}
                            onChange={handleChange}
                            required
                            autoFocus=""
                            className="form-control rounded-pill border-0 shadow-sm px-4"
                          />
                        </div>

                        <div className="form-group mb-3">
                          <input
                            id="inputPassword"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={userDetails.password}
                            onChange={handleChange}
                            required
                            className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                            minLength="6"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            id="inputAdress"
                            type="text"
                            placeholder="Address"
                            name="address"
                            value={userDetails.address}
                            onChange={handleChange}
                            required
                            autoFocus=""
                            className="form-control rounded-pill border-0 shadow-sm px-4"
                          />
                        </div>
                        <div className="custom-control custom-checkbox mb-3">
                          <input
                            id="customCheck1"
                            type="checkbox"
                            className="custom-control-input mx-2"
                            required
                          />
                          <label
                            htmlFor="customCheck1"
                            className="custom-control-label mx-2"
                          >
                            Accept terms & conditions.
                          </label>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-block text-uppercase mb-2 rounded-4 shadow-sm"
                        >
                          Sign Up
                        </button>
                        <p className="d-inline ms-3">
                          Alreday have an account?{" "}
                          <Link to="/login">Log in</Link>
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
