import { createSlice } from "@reduxjs/toolkit";

const initialState = null;
var timeOut;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    displayNotification(state, action) {
      return {
        ...state,
        message: action.payload,
        type: "success",
      };
    },
    displayErrorNotification(state, action) {
      return { ...state, message: action.payload, type: "error" };
    },
    removeNotification(state, action) {
      const id = action.payload;
      return state.filter((notification) => notification.id !== id);
    },
    clearNotification(state, action) {
      return null;
    },
  },
});

export const {
  displayNotification,
  displayErrorNotification,
  clearNotification,
} = notificationSlice.actions;

export const setNotification = (message) => {
  return async (dispatch) => {
    clearTimeout(timeOut);
    dispatch(displayNotification(message));
    timeOut = setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
};

export const setErrorNotification = (message) => {
  return async (dispatch) => {
    clearTimeout(timeOut);
    dispatch(displayErrorNotification(message));
    timeOut = setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
};

export default notificationSlice.reducer;
