import { h } from "preact";
import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

const Layout = ({ children }) => {
  return <div className={`${ID}-layout`}>{children}</div>;
};

export default Layout;
