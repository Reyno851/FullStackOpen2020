import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => {
        return (
          <Part name={part.name} exercises={part.exercises} key={part.id} />
        );
      })}

      <div style={{ fontWeight: "bold"}}>
        total of&nbsp;
        {parts.reduce((total, part) => {
          return (total += part.exercises);
        }, 0)}
        &nbsp;exercises
      </div>
    </div>
  );
};

export default Content;
