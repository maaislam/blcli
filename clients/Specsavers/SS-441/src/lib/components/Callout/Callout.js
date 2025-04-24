import shared from "../../../../../../../core-files/shared";

const { ID, VARIATION } = shared;

export default function Callout(title, ctaText, ctaLink, afterText = "") {
	const element = document.createElement("div");
	element.classList.add(`${ID}-callout`, `${ID}-container`);
	element.innerHTML = /* html */ `
	<h2 class="${ID}-callout__title">${title}</h2>
	${
		VARIATION == 1
			? `<h2 class="${ID}-callout__title mobile-only">Upgrade your Eye Test</h2> <p class="${ID}-callout__subtitle">Get the most advanced eye test to catch problems before they affect your vision</p>`
			: ""
	}
	<a class="${ID}-callout__cta btn btn--secondary" href="${ctaLink}">${ctaText}</a>
	${
		afterText.length > 0
			? /* html */ `<p class="${ID}-callout__after-text">${afterText}</p>`
			: ""
	}
	`;

	return element;
}
