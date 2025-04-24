import { h } from "preact";
import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

const Header = () => {
  return (
    <header className={`${ID}-header`}>
      <h2>Need a hand looking for something?</h2>
      <p>Discover amazing products with a few clicks give it a go!</p>
    </header>
  );
};

export default Header;
