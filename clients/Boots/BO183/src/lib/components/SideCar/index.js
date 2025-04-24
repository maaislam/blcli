import { h } from "preact";
import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

const SideCar = ({ children, title, category }) => {
  return (
    <div className={`${ID}-sidecar ${category || "sale"}`}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default SideCar;
