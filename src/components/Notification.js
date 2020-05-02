import React from "react";

const Notification = ({ notification }) => {
  const { message, status } = notification;

  if (message === null) {
    return;
  }

  return <div className={status}>{message}</div>;
};

export default Notification;
