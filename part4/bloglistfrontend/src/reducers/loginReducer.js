import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    userLogin(state, action) {
      return action.payload;
    },
    userLogout(state, action) {
      return null;
    },
  },
});

export const { userLogin, userLogout } = loginSlice.actions;

export const signIn = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    dispatch(userLogin(user));
  };
};

export default loginSlice.reducer;
