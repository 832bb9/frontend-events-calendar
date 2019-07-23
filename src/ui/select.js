import React from "react";

import "./select.css";

export const Select = ({ label, options, value, onChange: commit }) => {
  const onChange = event => {
    commit(event.target.value);
  };

  return (
    <div className="ui-select">
      <label className="ui-select-label">{label}</label>
      <select className="ui-select-control" value={value} onChange={onChange}>
        {options.map(({ key, caption }) => (
          <option key={key} value={key}>
            {caption}
          </option>
        ))}
      </select>
    </div>
  );
};
