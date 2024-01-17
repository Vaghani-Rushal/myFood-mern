export default function Advertise({ search, handleSearch }) {
  return (
    <>
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-caption my-3" style={{ zIndex: "10" }}>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                value={search}
                onChange={(event) => handleSearch(event.target.value)}
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-success btn-md" type="submit">
                Search
              </button>
            </form>
          </div>
          <div className="carousel-item active">
            <img
              src="/assets/images/advertises/add1.jpg"
              className="d-block w-100 h-50"
              alt="add-1 image"
              style={{
                filter: "brightness(30%)",
                minHeight: "15rem",
                maxHeight: "30rem",
              }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="/assets/images/advertises/add2.jpg"
              className="d-block w-100 h-50"
              alt="add-2 image"
              style={{
                filter: "brightness(30%)",
                minHeight: "15rem",
                maxHeight: "30rem",
              }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="/assets/images/advertises/add3.jpg"
              className="d-block w-100 h-50"
              alt="add-3 image"
              style={{
                filter: "brightness(30%)",
                minHeight: "15rem",
                maxHeight: "30rem",
              }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}
