import React from 'react';
import PropTypes from 'prop-types';

const ErrorText = ({ error }) => {
    return (
        <span>{error}</span>
    );
}

ErrorText.propTypes = {
    error: PropTypes.string.isRequired
}

export default ErrorText;