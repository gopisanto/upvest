import React from 'react';
import PropTypes from 'prop-types';

const LabelValue = ({ label, value }) => (
  <div className="label-value">
    <label className="lv-label">{label}</label>
    <label className="lv-value">{value}</label>
  </div>
);

LabelValue.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};

LabelValue.defaultProps = {
  label: '',
  value: '',
};

export default LabelValue;
