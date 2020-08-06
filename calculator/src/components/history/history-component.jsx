import React from "react";

import "./history-styles.css";

export default function History({ history }) {
  let id = 0;
  if (history.length > 0) {
    return (
      <div>
        <ol>
          {history.map((val) => (
            <li key={id++}>{val}</li>
          ))}
        </ol>
      </div>
    );
  } else {
    return <p>No items</p>;
  }
}
