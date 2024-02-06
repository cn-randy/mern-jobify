import React from "react";
import { JOB_STATUS } from "../../../utils/constants.js";

const FormRowSelect = ({
  name,
  labelText,
  list,
  onChage,
  defaultValue = "",
  error = null,
}) => {
  return (
    <div className="formRow">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        className="form-select"
        name={name}
        id={name}
        defaultValue={defaultValue}
        onChange={onChage}
      >
        {list.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
export default FormRowSelect;
