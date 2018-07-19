import React from 'react';
import PropTypes from 'prop-types';

const Col = ({ numCol, children }) => (
  <div className={`col col-${numCol}`}>
    {children}
  </div>
);

Col.propTypes = {
  numCol: PropTypes.number.isRequired,
  children: PropTypes.any.isRequired,
};

export default Col;
