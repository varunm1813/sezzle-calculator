import React from "react";

import "./button-styles.css";

export default function Button(props) {
  let operators = new Set(["+", "/", "*", "-", "="]);

  return (
    <button
      className={
        operators.has(props.value)
          ? props.value === "="
            ? "equal"
            : "operator"
          : "number"
      }
      type="button"
      id={props.id}
      onClick={props.click}
    >
      {props.value}
    </button>
  );
}
