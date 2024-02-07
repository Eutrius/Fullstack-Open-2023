import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";

const Notification = () => {
  const [message, dispatch] = useContext(NotificationContext)


  if (message !== "") {
    setTimeout(() => {
      dispatch({type: "REMOVE_MESSAGE"})
    }, 5000)
  }
  
  return (
  <div style={{display: message === "" ? "none": ""}}>
      {message}
    </div>
  )
}


export default Notification;

