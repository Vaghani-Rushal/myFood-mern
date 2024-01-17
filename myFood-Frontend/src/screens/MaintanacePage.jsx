import { Link } from "react-router-dom";

export default function MaintanacePage() {
  return (
    <>
      <div className="justify-content-center">
        <div className="text-center">
          <h1 className="display-1 fw-bold">503</h1>
          <p className="fs-3">
            {" "}
            <span className="text-danger">Sorry!</span> Page is Under
            maintenance.
          </p>
          <p className="lead">
            The page you’re looking for is under construction.
          </p>
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
}
