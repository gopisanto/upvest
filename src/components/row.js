import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ className, children }) => (
  <div className={`row ${className}`}>
    {children}
  </div>
);

Row.propTypes = {
  className: PropTypes.string,
  children: PropTypes.array.isRequired,
};

Row.defaultProps = {
  className: '',
};

export default Row;
