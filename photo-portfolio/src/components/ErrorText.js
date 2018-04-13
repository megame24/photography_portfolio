import React from "react";
import PropTypes from "prop-types";

const ErrorText = ({ error }) => <span style={{ color: "#ae5856" }}>{error}</span>;

ErrorText.propTypes = {
  error: PropTypes.string.isRequired
};

export default ErrorText;
