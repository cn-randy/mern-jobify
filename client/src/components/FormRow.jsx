import React from "react";

const FormRow = ({ type, name, labelText, defaultValue, error, onChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue}
        required
        onChange={onChange}
      />
      {error && <p style={{ color: "red", textAlign: "left" }}>{error}</p>}
    </div>
  );
};
export default FormRow;
