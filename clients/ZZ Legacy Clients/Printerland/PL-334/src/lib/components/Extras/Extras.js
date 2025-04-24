import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

export default function Extras(buttons) {
	const el = document.createElement("div");
	el.classList.add(`${ID}-extras`);

	const heading = document.createElement("h3");
	heading.textContent = "Learn more";
	el.append(heading);

	const elList = document.createElement("ul");

	buttons.forEach((button) => elList.append(button));

	el.append(elList);

	return el;
}
