import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },

    removeItem: (state, action) => {
      const { itemId, size } = action.payload;
      const newState = state.filter((item) => {
        if (item.itemId !== itemId) {
          return item;
        }
        if (item.size !== action.payload.size) {
          return item;
        }
      });
      return newState;
    },

    emptyCart: (state) => {
      return [];
    },

    updateItemQuantity: (state, action) => {
      const { index, newQty } = action.payload;
      const updatedCart = [...state];
      updatedCart[index] = {
        ...updatedCart[index],
        price: newQty * (updatedCart[index].price / updatedCart[index].qty),
        qty: newQty,
      };
      return updatedCart;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
