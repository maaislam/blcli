import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

function Tab(image, text) {
	const element = document.createElement("div");
	element.classList.add(`${ID}-one-column-tab`);
	element.innerHTML = /* html */ `
		<img class="${ID}-one-column-tab__image" src="${image}" alt="" />
		<p class="${ID}-one-column-tab__text">${text}</p>
	`;

	return element;
}

export default function OneColumnTabs(title, lists) {
	const element = document.createElement("div");
	element.classList.add(`${ID}-one-column-tabs`);
	element.innerHTML = /* html */ `
	<div class="${ID}-one-column-tabs__container ${ID}-container">
		<h2 class="${ID}-one-column-tabs__title">${title}</h2>
		<div class="${ID}-one-column-tabs__tab-container"></div>
	</div>
	`;

	lists.forEach((l) =>
		element.querySelector(`.${ID}-one-column-tabs__tab-container`).append(Tab(l.image, l.text))
	);

	return element;
}
