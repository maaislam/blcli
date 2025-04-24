import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

export default function Specs(buttons) {
	const el = document.createElement("div");
	el.classList.add(`${ID}-specs`);

	el.innerHTML = /* html */ `
		<h3>View Detailed Specification</h3>
	`;

	const elList = document.createElement("ul");

	buttons.forEach((button) => {
		const elButton = document.createElement("li");
		const elImage = document.createElement("div");
		elImage.classList.add(`${ID}-specs__image`);
		elButton.appendChild(elImage);
		elButton.appendChild(button);
		elList.appendChild(elButton);
	});

	el.appendChild(elList);

	return el;
}
