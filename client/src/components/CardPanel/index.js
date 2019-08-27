import React from "react";


function CardPanel(props) {
  return (
    <div className="card-panel center" {...props}>{props.children}</div>
  );
}

export default CardPanel;
