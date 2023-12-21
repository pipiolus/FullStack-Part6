import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "MSG":
      return action.payload;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [message, dispatchMessage] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[message, dispatchMessage]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
