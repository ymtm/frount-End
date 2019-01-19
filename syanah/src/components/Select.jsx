import React from "react";

const Select = ({ name, options, lable, onChange }) => {
  return (
    <div className="form-group">
      <lable>{lable}</lable>
      <select name={name} className="form-control" onChange={onChange}>
        <option value={options[0]}> choose </option>
        {options.map((option, index) => {
          return <option value={option}>{option}</option>;
        })}
      </select>
    </div>
  );
};

export default Select;
