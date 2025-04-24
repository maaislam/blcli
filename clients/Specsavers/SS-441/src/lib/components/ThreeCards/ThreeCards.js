import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

function Card(title, image, text) {
	const element = document.createElement("li");
	element.classList.add(`${ID}-three-cards__card`);
	element.innerHTML = /* html */ `
	<div class="${ID}-three-cards__card-content ${
		title.length > 0 ? "three-rows" : ""
	}">
		${
			title.length > 0
				? /* html */ `<h2 class="${ID}-three-cards__card-content-title">${title}</h2>`
				: ""
		}
		<div class="${ID}-three-cards__card-content-image">
			<img src="${image}" alt="${title}" />
		</div>
		<p class="${ID}-three-cards__card-content-text">${text}</p>
	</div>
	`;

	return element;
}

export default function ThreeCards(
	title,
	cards,
	ctaText,
	ctaLink,
	cardModifier = ""
) {
	const element = document.createElement("div");
	element.classList.add(`${ID}-three-cards`);
	element.innerHTML = /* html */ `
	<div class="${ID}-three-cards__container ${ID}-container">
	${
		title.length > 0
			? /* html */ `<h2 class="${ID}-three-cards__title">${title}</h2>`
			: ""
	}
		<ul class="${ID}-three-cards__list ${cardModifier}"></ul>
		${
			ctaText.length > 0
				? /* html */ `<a class="${ID}-three-cards__cta btn btn--secondary" href="${ctaLink}">${ctaText}</a>`
				: ""
		}
	</div>
	`;

	cards.forEach((c) =>
		element.querySelector(`ul`).append(Card(c.title, c.image, c.text))
	);

	return element;
}
