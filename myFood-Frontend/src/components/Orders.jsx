import { useId } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Orders({ orderData }) {
  const id = useId();
  const navigate = useNavigate();

  const getTimeAndDate = (d) => {
    const date = new Date(d);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    let hours = date.getHours();
    const minutes = date.getMinutes();

    const meridiem = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const formattedDate = `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}/${year}`;
    const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${meridiem}`;

    return `${formattedDate} ( ${formattedTime} )`;
  };

  return (
    <>
      {/* if there is no orders */}
      {!orderData.length && (
        <div className="justify-content-center">
          <div className="text-center">
            <p className="fs-3">
              {" "}
              <span className="text-danger">No Orders Yet!</span>
            </p>
            <p className="lead">Start placing some delicious orders!</p>
            <Link onClick={() => navigate("/")} className="btn btn-primary">
              Return to Home
            </Link>
          </div>
        </div>
      )}

      {/* if there is orders */}
      {orderData.length && (
        <div className="container py-2">
          <div className="fs-2 mb-4">My Orders: </div>
          <div className="container">
            {orderData.map((orderItem) => {
              return (
                <div key={orderItem._id} className="mb-5">
                  <div className="d-flex">
                    <span className="mx-2 fs-5 text-primary me-auto">
                      {getTimeAndDate(orderItem.date)}
                    </span>
                    <span className="text-success fs-5 mx-3">
                      Total Payment (₹) : {orderItem.totalPayment}/-
                    </span>
                  </div>
                  <hr />
                  <div className="row mx-2 row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
                    {orderItem.order.map((item) => {
                      return (
                        <div
                          key={id + item.itemId + item.price}
                          className="col"
                        >
                          <div
                            className="card bg-secondary-subtle mt-3"
                            style={{ width: "16rem", maxHeight: "18rem" }}
                          >
                            <img
                              src={item.itemImg}
                              className="card-img-top"
                              alt="..."
                              style={{ height: "120px", objectFit: "fill" }}
                            />
                            <div className="card-body bg-secondary-subtle">
                              <h5 className="card-title">{item.itemName}</h5>
                              <div className="container w-100 p-0">
                                <div>
                                  <span className="btn btn-sm btn-outline-primary mx-2">
                                    Qty : {item.qty}
                                  </span>
                                  <span className="btn btn-sm btn-outline-primary mx-1">
                                    Size : {item.size}
                                  </span>
                                </div>
                                <div className="mx-2 mt-3 btn btn-success">
                                  Total Price (₹) : {item.price}/-
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
