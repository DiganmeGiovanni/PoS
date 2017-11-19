import React from 'react';
import PropTypes from 'prop-types';

const FormGroup = ({ label, id, name, type, errMessage, handleChange }) => {
  let inpId = id;
  if (id !== null) {
    inpId = `inp-${name}`;
  }

  const lbl = <label className={'control-label'} htmlFor="inpId">{label}</label>;
  const inp = (
    <input
      id={inpId}
      name={name}
      type={type}
      className={'form-control'}
      onChange={handleChange}
    />
  );
  const helpBlock = errMessage !== null
    ? <span className={'help-block'}>{errMessage}</span>
    : null;

  return (
    <div className={`form-group${errMessage !== null ? ' has-error' : ''}`}>
      {lbl}
      {inp}

      {helpBlock}
    </div>
  );
};

FormGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  errMessage: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

FormGroup.defaultProps = {
  id: null,
  errMessage: null,
};

export default FormGroup;
