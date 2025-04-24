import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

export default function HeroBanner(title, subtitle, image, ctaText, ctaLink) {
	const element = document.createElement("div");
	element.classList.add(`${ID}-hero-banner`, `${ID}-container`, "wide");
	element.innerHTML = /* html */ `
	<div class="${ID}-hero-banner__container">
		<div class="${ID}-hero-banner__content">
			<h1 class="${ID}-hero-banner__content-title">${title}</h1>
			<p class="${ID}-hero-banner__content-subtitle">${subtitle}</p>
			<a class="${ID}-hero-banner__content-cta btn btn--secondary" href="${ctaLink}">${ctaText}</a>
		</div>
		<div class="${ID}-hero-banner__image">
			<img src="${image}" alt="${title}" />
		</div>
	</div>
	`;

	return element;
}
