import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification && notification.type === "success") {
    return <div className="successful">{notification.message}</div>;
  } else if (notification && notification.type === "error") {
    return <div className="error">{notification.message}</div>;
  }
};

export default Notification;
