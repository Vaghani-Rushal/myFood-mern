import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart";
import CartModal from "../screens/CartModal";
import Cart from "../screens/Cart";

export default function FoodItem({ item }) {
  const options = item.options[0];
  const optionNames = Object.keys(options).filter((key) => key != "_id");

  const dispatch = useDispatch();

  const cartData = useSelector((store) => store.cart);
  const [itemInCart, setItemInCart] = useState(false);
  const [cartView, setCartView] = useState(false);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(optionNames[0]);
  const [price, setPrice] = useState(parseInt(options[optionNames[0]]));

  useEffect(() => {
    setPrice(qty * parseInt(options[size]));

    const isInCart = cartData.some(
      (food) => food.itemId === item._id && food.size === size
    );
    setItemInCart(isInCart);
  }, [qty, size, options, cartData]);

  const handleQty = async (event) => {
    setQty(event.target.value);
  };
  const handleSize = (event) => {
    setSize(event.target.value);
  };

  const handleAddToCart = () => {
    const cartItem = {
      itemId: item._id,
      itemImg: item.img,
      itemName: item.name,
      price: price,
      qty: qty,
      size: size,
    };

    dispatch(cartActions.addItem(cartItem));
  };

  return (
    <>
      {cartView && (
        <CartModal onClose={() => setCartView(false)}>
          <Cart onClose={() => setCartView(false)} />
        </CartModal>
      )}

      <div className="col">
        <div className="card bg-secondary-subtle h-100 border-0 rounded-3">
          <img
            src={item.img}
            className="card-img-top rounded-top-3"
            style={{ height: "15rem" }}
          />
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p className="ms-auto card-text fs-5">Total Price : ₹ {price}/-</p>
          </div>

          <div className="card-footer border-top rounded-bottom-3 py-2 bg-secondary">
            <small className="text-body-secondary row gy-2 gx-3 align-items-center">
              
              {/* Quantity Otption */}
              {!itemInCart && (
                <div className="col-auto">
                  <label className="visually-hidden" htmlFor="autoSizingSelect">
                    Quantity
                  </label>

                  <select
                    className="form-select bg-dark-subtle"
                    id="autoSizingSelect"
                    value={qty}
                    onChange={handleQty}
                  >
                    {Array.from(Array(6), (e, i) => {
                      return (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}

              {/* Size option */}
              <div className="col-auto me-auto">
                <label className="visually-hidden" htmlFor="autoSizingSelect">
                  Size
                </label>
                <select
                  className="form-select bg-dark-subtle"
                  id="autoSizingSelect"
                  value={size}
                  onChange={handleSize}
                >
                  {optionNames.map((name) => {
                    return (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Add to cart Or Go to Cart buttons */}
              <div className="col-auto">
                {itemInCart && (
                  <>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() =>
                        dispatch(
                          cartActions.removeItem({
                            itemId: item._id,
                            size: size,
                          })
                        )
                      }
                    >
                      Remove
                    </button>
                    <button
                      className="btn btn-success mx-1"
                      onClick={() => setCartView(true)}
                    >
                      Go to Cart
                    </button>
                  </>
                )}

                {!itemInCart && (
                  <button className="btn btn-primary" onClick={handleAddToCart}>
                    Add To Cart
                  </button>
                )}
              </div>
            </small>
          </div>
        </div>
      </div>
    </>
  );
}
