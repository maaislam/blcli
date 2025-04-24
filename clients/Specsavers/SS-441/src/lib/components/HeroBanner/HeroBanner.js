import shared from "../../../../../../../core-files/shared";

const { ID, VARIATION } = shared;

export default function HeroBanner(
	title,
	subtitle,
	image,
	ctaText,
	ctaLink,
	mTitle = "",
	mSubtitle = ""
) {
	const element = document.createElement("div");
	element.classList.add(
		`${ID}-hero-banner`,
		`${ID}-container-banner`,
		"wide"
	);
	element.innerHTML = /* html */ `
	<div class="${ID}-hero-banner__container">
		<div class="${ID}-hero-banner__content">
			<h1 class="${ID}-hero-banner__content-title">${title}</h1>
			${
				mTitle !== ""
					? `<h1 class="${ID}-hero-banner__content-title mobile-only">${mTitle}</h1>`
					: `<h1 class="${ID}-hero-banner__content-title mobile-only">${title}</h1>`
			}
			<p class="${ID}-hero-banner__content-subtitle">${subtitle}</p>
			${
				mSubtitle !== ""
					? `<p class="${ID}-hero-banner__content-subtitle mobile-only">${mSubtitle}</p>`
					: `<p class="${ID}-hero-banner__content-subtitle mobile-only">${subtitle}</p>`
			}
			<a class="${ID}-hero-banner__content-cta" href="${ctaLink}">${ctaText}</a>
		</div>
		<div class="${ID}-hero-banner__image">
			<img src="${image}" alt="${title}" />
		</div>
	</div>
	`;

	return element;
}
