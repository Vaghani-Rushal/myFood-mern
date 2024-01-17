import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { cartActions } from "../store/cart";

export default function Cart({ onClose }) {
  const cartData = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQtyDec = (index) => {
    dispatch(
      cartActions.updateItemQuantity({
        index,
        newQty: parseInt(cartData[index].qty) - 1,
      })
    );
  };
  const handleQtyInc = (index) => {
    dispatch(
      cartActions.updateItemQuantity({
        index,
        newQty: parseInt(cartData[index].qty) + 1,
      })
    );
  };

  const handleCheckOut = async () => {
    const userExist = localStorage.getItem("auth-token");

    if (!userExist) {
      await onClose();
      navigate("/login");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");

      const userOrderJson = JSON.stringify({
        userId: userId,
        totalPayment: totalPrice,
        order: cartData,
      });

      const result = await fetch(
        "https://myfood-mern.onrender.com/api/orders/updateorder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: userOrderJson,
        }
      );

      const jsonResult = await result.json();

      if (!jsonResult.success) {
        alert(jsonResult.message);
      } else {
        await onClose();
        dispatch(cartActions.emptyCart());
        // setOrderDispatch(true);
        document.getElementById("checkOutModal").click();
      }
    } catch (error) {
      alert("Sorry!!! Internal Server Error.");
    }
  };

  const totalPrice = cartData.reduce((total, food) => {
    return total + food.price;
  }, 0);

  return (
    <>
      {/* order Delivered Modal */}
      <button
        type="button"
        hidden
        id="checkOutModal"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      ></button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ zIndex: "2000" }}
      >
        <div className="modal-dialog text-bg-dark">
          <div className="modal-content text-bg-dark">
            <div className="modal-header text-bg-dark">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Order Delivered!
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-bg-dark">
              Your order from myFood has been successfully delivered
              to your address. We hope you enjoy your meal!
            </div>
            <div className="modal-footer text-bg-dark">
              <button
                type="button"
                className="btn btn-outline-primary"
                data-bs-dismiss="modal"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* If cart is Empty */}
        {cartData.length == 0 && (
          <div className="justify-content-center">
            <div className="text-center">
              <p className="fs-3">
                {" "}
                Your Cart is <span className="text-danger">Empty!</span>
              </p>
              <p className="lead">
                Must add items on the cart before you procced to check out.
              </p>
              <Link onClick={onClose} className="btn btn-primary">
                Return to Home
              </Link>
            </div>
          </div>
        )}

        {/* cart */}
        {cartData.length != 0 && (
          <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
            <table className="table table-hover table-dark ">
              <thead className="fs-4 table-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Option</th>
                  <th scope="col">Amount</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((food, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{food.itemName}</td>
                      <td>
                        <button
                          className={`btn btn-sm px-2 py-0 btn-outline-danger me-3 ${
                            parseInt(food.qty) - 1 <= 0 ? "disabled" : ""
                          }`}
                          onClick={() => handleQtyDec(index)}
                        >
                          -
                        </button>
                        {food.qty}
                        <button
                          className={`btn btn-sm px-2 py-0 btn-outline-success ms-3 ${
                            parseInt(food.qty) + 1 > 12 ? "disabled" : ""
                          }`}
                          onClick={() => handleQtyInc(index)}
                        >
                          +
                        </button>
                      </td>
                      <td>{food.size}</td>
                      <td>{food.price}</td>
                      <td>
                        <button
                          className="btn btn-sm text-danger "
                          onClick={() => {
                            dispatch(
                              cartActions.removeItem({
                                itemId: food.itemId,
                                size: food.size,
                              })
                            );
                          }}
                        >
                          Remove <MdOutlineDeleteOutline />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="d-flex">
              <div className="me-auto">
                <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
              </div>
              <div className="mx-4">
                <button
                  className="btn bg-success fs-5"
                  onClick={handleCheckOut}
                >
                  {" "}
                  Check Out{" "}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
