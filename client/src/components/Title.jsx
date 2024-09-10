import React from "react";
import clsx from "clsx";

const Title = ({ title, className }) => {
  return (
    <h2 className={clsx("text-3xl font-bold uppercase", className)}>
      {title}
    </h2>
  );
};

export default Title;