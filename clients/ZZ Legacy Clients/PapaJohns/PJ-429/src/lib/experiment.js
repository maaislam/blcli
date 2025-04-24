/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { h, render } from "preact";
import App from "./App";

const { ID } = shared;

export default () => {
	setup();

	const root = document.createElement("div");
	root.id = `${ID}-root`;
	document.body.append(root);

	render(<App />, root);
};
