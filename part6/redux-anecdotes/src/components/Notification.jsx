import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification.message);
  const isVisible = useSelector((state) => state.notification.visible);
  const style = {
    display: isVisible ? "" : "none",
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notification}</div>;
};

export default Notification;
