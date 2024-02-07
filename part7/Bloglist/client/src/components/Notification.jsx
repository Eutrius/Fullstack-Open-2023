import { useDispatch, useSelector } from "react-redux"
import { removeNotification } from "../reducers/notificationReducer";
import { Alert } from "react-bootstrap";

const Notification = () => {
 const message = useSelector(state => state.notification)
  const dispatch = useDispatch();


  if (message !== "") {
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
  
  return (
    <Alert variant="success" style={{display: message === "" ? "none": ""}}>
      {message}
    </Alert>
  )
}


export default Notification;
