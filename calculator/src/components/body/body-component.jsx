import React from "react";

import "./body-styles.css";

import Button from "../button/button-component";

export default function Body(props) {
  const buttons = [
    "C",
    "(",
    ")",
    "+",
    7,
    8,
    9,
    "/",
    4,
    5,
    6,
    "*",
    1,
    2,
    3,
    "-",
    "%",
    ".",
    0,
    "=",
  ];

  return (
    <div className="calculator-body">
      <div className="calculator-main">
        {buttons.map((value) => (
          <Button
            value={value}
            id={value}
            key={value}
            click={() => props.click(value)}
          />
        ))}
      </div>
    </div>
  );
}
