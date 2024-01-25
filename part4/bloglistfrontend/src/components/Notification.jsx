const Notification = ({ message, errorMessage }) => {
  if (message) {
    return <div className="successful">{message}</div>;
  } else if (errorMessage) {
    return <div className="error">{errorMessage}</div>;
  }
};

export default Notification;
