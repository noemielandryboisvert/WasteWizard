import React from 'react';
import PropTypes from 'prop-types';
import './Error.scss';

/**
 * Error component renders:
 * 1 - Error message
 * 2 - Retry button
 */
const Error = ({ msg, onRetry }) => (
  <span className="error">
    {msg}
    <button type="button" onClick={onRetry}>Retry</button>
  </span>
);

Error.propTypes = {
  msg: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default Error;
