import { h } from "preact";
import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

const TileGrid = ({ children, collapsed }) => {
  return (
    <ul className={`${ID}-tile-grid ${collapsed ? "collapsed" : ""}`}>
      {children}
    </ul>
  );
};

export default TileGrid;
