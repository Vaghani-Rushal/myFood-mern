export default function LoadingSpinner() {
  return (
    <>
      <div className="d-flex justify-content-center spinner mb-4">
        <div
          className="spinner-border"
          role="status"
          style={{ width: "5rem", height: "5rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <div className="d-flex justify-content-center my-3 fs-4">
        Please wait, It will take time due to slow doploy server.
      </div>
    </>
  );
}
