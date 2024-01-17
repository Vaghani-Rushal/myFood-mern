import { useEffect, useState } from "react";
import Error from "../screens/Error.jsx";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderStatusActions } from "../store/fetchOrders.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import Orders from "../components/Orders.jsx";

export default function MyOrder() {
  const fetchOrderStatus = useSelector((store) => store.fetchOrderStatus);
  const dispatch = useDispatch();

  const userId = localStorage.getItem("userId");
  const [orderData, setOrderData] = useState([]);

  if (!userId) {
    return <Error />;
  }

  const fetchMyOrder = async () => {
    dispatch(fetchOrderStatusActions.markFetchingStarted());
    const result = await fetch("https://myfood-mern.onrender.com/api/orders/getorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId }),
    });

    const resultJson = await result.json();

    if (!resultJson.success) {
      return alert("internal Server Error!");
    }

    if (resultJson.orderItems) {
      const data = resultJson.orderItems.orders.reverse();
      setOrderData(data);
    }
    dispatch(fetchOrderStatusActions.markFetchDone());
    dispatch(fetchOrderStatusActions.markFetchingFinished());
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      {fetchOrderStatus.currentlyFetching ? (
        <LoadingSpinner />
      ) : (
        <Orders orderData={orderData} />
      )}
    </>
  );
}
