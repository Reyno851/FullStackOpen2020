import React from "react";

const Filter = ({ inputName, handleInputNameChange }) => {
  return (
    <div>
      filter shown with <input value={inputName} onChange={handleInputNameChange} />
    </div>
  );
};

export default Filter;
