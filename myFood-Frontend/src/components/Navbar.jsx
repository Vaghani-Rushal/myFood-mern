import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import CartModal from "../screens/CartModal";
import Cart from "../screens/Cart";

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const cartLength = useSelector((store) => store.cart).length;
  const isUserLogedin = localStorage.getItem("auth-token");
  const navigate = useNavigate();

  const handleLogut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      {/* Logout Modal */}
      <div
        className="modal fade"
        id="logoutModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog text-bg-dark">
          <div className="modal-content text-bg-dark">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Logout From myFood
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Are you sure you want to Logout!!!</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary px-3 mx-2"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleLogut}
                data-bs-dismiss="modal"
                className="btn btn-primary px-3 mx-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* navbar */}
      <nav className="navbar sticky-top navbar-expand-lg bg-dark navbar-dark mb-4">
        <div className="container py-2 border-bottom border-light-subtle">
          <Link to="/" className="text-decoration-none">
            <span className="fs-3 text-bg-dark">myFood</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="ms-auto me-auto">
              <ul className="navbar-nav  mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" className="nav-link px-2 link-primary">
                    Home
                  </Link>
                </li>
                {isUserLogedin && (
                  <li className="nav-item">
                    <Link to="/myorders" className="nav-link px-2 ">
                      myOrders
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link to="/about" className="nav-link px-2">
                    About
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link to="/contact" className="nav-link px-2">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <Link
              type="button"
              onClick={() => setCartView(true)}
              className="btn btn-outline-success me-3 position-relative"
            >
              {" "}
              Cart{" "}
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartLength ? cartLength : "0"}
              </span>
            </Link>

            {/* carView */}
            {cartView && (
              <CartModal onClose={() => setCartView(false)}>
                <Cart onClose={() => setCartView(false)} />
              </CartModal>
            )}

            {/* Login And Signup Button */}
            {!isUserLogedin && (
              <>
                <Link
                  to="/login"
                  type="button"
                  className="btn btn-outline-primary me-3"
                >
                  {" "}
                  Login{" "}
                </Link>
                <Link to="/signup" type="button" className="btn btn-primary">
                  {" "}
                  Sign-up{" "}
                </Link>
              </>
            )}

            {/* Logout Button */}
            {isUserLogedin && (
              <>
                <Link
                  type="button"
                  className="btn btn-outline-primary me-3"
                  data-bs-toggle="modal"
                  data-bs-target="#logoutModal"
                >
                  {" "}
                  Logout{" "}
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
