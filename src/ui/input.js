import React, { useState } from "react";

import "./input.css";

export const Input = ({ label, value, onChange: commit, commitOnBlur }) => {
  const [draft, setDraft] = useState(value);

  const onChange = event => {
    setDraft(event.target.value);
    if (!commitOnBlur) {
      commit(event.target.value);
    }
  };

  const onBlur = () => {
    if (commitOnBlur) {
      commit(draft);
    }
  };

  return (
    <div className="ui-input">
      <label className="ui-input-label">{label}</label>
      <input
        className="ui-input-control"
        type="text"
        value={draft}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};
