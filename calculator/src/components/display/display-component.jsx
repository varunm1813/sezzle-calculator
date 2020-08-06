import React from "react";

import "./display-styles.css";

export default function Display(props) {
  return (
    <div className="calculator-output">
      <input
        type="text"
        className="calculator-user-input"
        value={props.equation}
        disabled
      />
      <input
        type="text"
        className={props.error ? "calculator-error" : "calculator-answer"}
        value={props.error ? "Invalid Expression" : props.answer}
        disabled
      />
    </div>
  );
}
