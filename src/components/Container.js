import React from "react";
import './Container.css'

function Container(props) {
  return (
    <>
      <section>
        <div className="container">{props.children}</div>
      </section>
    </>
  );
}

export default Container;
