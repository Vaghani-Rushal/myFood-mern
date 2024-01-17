import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="" style={{ paddingBottom: "5rem" }}>
      <div className="w-100 text-bg-dark mt-4 position-absolute bottom-0">
        <div className="container">
          <footer className="d-flex flex-wrap justify-content-between align-items-center py-2 border-top border-light-subtle">
            <ul className="nav col-md-4">
              <li className="nav-item">
                <Link to="/" className="nav-link px-2 text-bg-dark">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="about" className="nav-link px-2 text-bg-dark">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="contact" className="nav-link px-2 text-bg-dark">
                  Contact
                </Link>
              </li>
            </ul>

            <Link to="/" className="text-decoration-none col-md-4">
              <span className="fs-3 text-bg-dark">myFood</span>
            </Link>

            <p className="ms-2 mb-0 text-bg-dark ">
              © {new Date().getFullYear()} myFood
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
