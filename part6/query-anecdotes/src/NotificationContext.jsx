import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return action.payload;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(notificationReducer, "");

  return (
    <NotificationContext.Provider value={[message, messageDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationMessage = () => {
  const messageAndDispatch = useContext(NotificationContext);
  return messageAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const messageAndDispatch = useContext(NotificationContext);
  return messageAndDispatch[1];
};

export default NotificationContext;
