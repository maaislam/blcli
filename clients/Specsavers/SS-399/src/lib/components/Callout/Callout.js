import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

export default function Callout(title, ctaText, ctaLink, afterText = "") {
	const element = document.createElement("div");
	element.classList.add(`${ID}-callout`, `${ID}-container`);
	element.innerHTML = /* html */ `
	<h2 class="${ID}-callout__title">${title}</h2>
	<a class="${ID}-callout__cta btn btn--secondary" href="${ctaLink}">${ctaText}</a>
	${afterText.length > 0 ? /* html */ `<p class="${ID}-callout__after-text">${afterText}</p>` : ""}
	`;

	return element;
}
