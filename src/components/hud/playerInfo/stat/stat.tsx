import React from "react";

interface IProps {
  stat: string;
  description: string;
}

const Stat: React.FC<IProps> = ({ stat, description }) => (
  <div className={"stat nick flex-col-container flex-justify-center"}>
    <p>
      <b>{description}</b>
    </p>
    <br />
    <p>{stat}</p>
  </div>
);

export default Stat;
