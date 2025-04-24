import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

export default function Details({ title, items }) {
	if (items.length === 0) return null;

	const el = document.createElement("div");
	el.classList.add(`${ID}-details`);

	el.innerHTML = /* html */ `
		<h4>${title}</h4>
		<ul>
			${items.map((item) => `<li>${item}</li>`).join("")}
		</ul>
	`;

	return el;
}
