import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

function List(title, description, listItems) {
	const element = document.createElement("div");
	element.classList.add(`${ID}-two-column-lists__list`);
	element.innerHTML = /* html */ `
		<h2 class="${ID}-two-column-lists__list-title">${title}</h2>
		<p class="${ID}-two-column-lists__list-description">${description}</p>
		<ul class="${ID}-two-column-lists__list-ul">
			${listItems
				.map(
					(item) => /* html */ `
				<li class="${ID}-two-column-lists__list-item">
					<p>${item.text}</p>
				</li>
				`
				)
				.join("")}
		</ul>
	`;

	return element;
}

export default function TwoColumnLists(title, lists) {
	const element = document.createElement("div");
	element.classList.add(`${ID}-two-column-lists`, `${ID}-container`);
	element.innerHTML = /* html */ `
	<h2 class="${ID}-two-column-lists__title">${title}</h2>
	<div class="${ID}-two-column-lists__list-container"></div>
	`;

	lists.forEach((l) =>
		element
			.querySelector(`.${ID}-two-column-lists__list-container`)
			.append(List(l.title, l.description, l.items))
	);

	return element;
}
