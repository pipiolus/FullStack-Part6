import { createSlice } from "@reduxjs/toolkit";

const notificationSlicer = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
    clearMessage() {
      return "";
    },
  },
});

export const { setMessage, clearMessage } =
  notificationSlicer.actions;

export const setNotification = (message, timeout) => {
  return (dispatch) => {
    dispatch(setMessage(message));
    setTimeout(() => {
      dispatch(clearMessage());
    }, timeout * 1000);
  };
};

export default notificationSlicer.reducer;
