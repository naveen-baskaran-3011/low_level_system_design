import { useState } from "react";
import Options from "./Options";

function IconFile(props) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z" />
    </svg>
  );
}

export default function File({ label, config, isEditing, setIsEditing, onChange, onSave }) {
  return <div className="container">
    <div className="main-content file">
      <div className="icon">
        <IconFile />
      </div>
      <div className="label">
        {isEditing ? <input
          type="text"
          autoFocus
          defaultValue={label}
          onChange={onChange}
          onKeyUp={e => e.key === "Enter" && onSave()}
          onBlur={onSave} /> : label}
        <div>
          <Options
            setIsEditing={setIsEditing}
            config={config}
            onChange={onChange}
            onSave={onSave} />
        </div>
      </div>
    </div>
  </div>
}