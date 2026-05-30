import React from "react";
import PropTypes from "prop-types";

const Toast = ({ message, type = "success" }) => {
  return (
    <div
      className={`p-3 rounded shadow ${type === "success" ? "bg-green-600" : "bg-red-600"} text-white`}
    >
      {message}
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default Toast;
