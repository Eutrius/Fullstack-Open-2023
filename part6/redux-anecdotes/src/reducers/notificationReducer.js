import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  visible: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    setMessage(state, action) {
      const message = action.payload;
      return { message, visible: true };
    },
    removeNotification(state, action) {
      return initialState;
    },
  },
});

export const { setMessage, removeNotification } = notificationSlice.actions;

export const setNotification = (message, duration) => {
  return (dispatch) => {
    dispatch(setMessage(message));
    setTimeout(() => {
      dispatch(removeNotification());
    }, duration * 1000);
  };
};
export default notificationSlice.reducer;
