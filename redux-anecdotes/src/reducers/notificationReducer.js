import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    displayNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return null;
    },
  },
});

export const { displayNotification, clearNotification } =
  notificationSlice.actions;

export const setNotification = (message, duration) => {
  return (dispatch) => {
    dispatch(displayNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, duration * 1000);
  };
};

export default notificationSlice.reducer;
