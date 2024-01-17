import React, { useEffect } from "react";

const Alert = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <>
      {message && (
        <div className="custom-alert-container">
          <div
            className={`custom-alert alert alert-${type} alert-dismissible fade show d-flex`}
            role="alert"
          >
            <div className="me-1">
              <strong>Error:</strong>
            </div>
            <div> {message}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
