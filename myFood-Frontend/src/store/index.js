import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./fooditems";
import fetchItemStatusSlice from "./fetchItems";
import cartSlice from "./cart";
import fetchOrderStatusSlice from "./fetchOrders";

const foodStore = configureStore({
  reducer: {
    foodItem: itemsSlice.reducer,
    fetchItemStatus: fetchItemStatusSlice.reducer,
    fetchOrderStatus: fetchOrderStatusSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default foodStore;
