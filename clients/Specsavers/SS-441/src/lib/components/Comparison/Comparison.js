import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

function Column(image, title, listItems, isHighlighted = false) {
	const element = document.createElement("div");
	element.classList.add(`${ID}-comparison-column`);
	element.innerHTML = /* html */ `
	<div class="${ID}-comparison-column__header">
		<img class="${ID}-comparison-column__image" src="${image}" alt="${title}">
		<h3 class="${ID}-comparison-column__title ${isHighlighted ? "highlighted" : ""}">${title}</h3>
	</div>
	<ul class="${ID}-comparison-column__list">
		${listItems
			.map(
				({ text }) => /* html */ `
			<li class="${ID}-comparison-column__list-item">
				<p class="${ID}-comparison-column__list-item-link">${text}</p>
			</li>
		`
			)
			.join("")}
	</ul>
	`;

	return element;
}

export default function Comparison(title, columns, ctaText, ctaLink) {
	const element = document.createElement("div");
	element.classList.add(`${ID}-comparison`);
	element.innerHTML = /* html */ `
	<div class="${ID}-comparison__container ${ID}-container">
		<h2 class="${ID}-comparison__title">${title}</h2>
		<div class="${ID}-comparison__column-container"></div>
		<a class="${ID}-comparison__cta btn btn--secondary" href="${ctaLink}">${ctaText}</a>
	</div>
	`;

	const columnContainer = element.querySelector(`.${ID}-comparison__column-container`);

	columns.forEach((c) => {
		columnContainer.append(Column(c.image, c.title, c.listItems, c.isHighlighted));
	});

	return element;
}
