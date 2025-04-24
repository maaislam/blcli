/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { ID, VARIATION } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");

	if (VARIATION == "control") {
		return;
	}

	const markup = `<section data-module="banner" class="${ID}-banner desktop-full-width" data-module-id="61076"><div class="image"><picture><source media="(max-width: 767px)" srcset="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUzNCIgaGVpZ2h0PSI0MDAiIHZpZXdCb3g9IjAgMCAxNTM0IDQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDEwOHYxMDBIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4=" data-srcset="https://content.specsavers.com/sib/home/img/banners/mobile/ES-sun2022-241-HomePage-offer-banner-Mobile.jpg"><img class="b-lazy" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ4MiIgaGVpZ2h0PSI3MDAiIHZpZXdCb3g9IjAgMCAxNDgyIDcwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDEwOHYxMDBIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4=" data-src="https://content.specsavers.com/sib/home/img/banners/tablet/ES-sun2022-241-HomePage-offer-banner-Tablet.jpg" alt=""></picture></div><div class="content tablet-trap"><span class="content-label">Offer</span><h2 class="h-md">2 for 1 glasses and sunglasses</h2><p>Buy a pair of glasses from our £69 range or above and get a second pair for free</p><a class="cta-text-chevron" href="/offers/2-for-1-glasses-from-gbp69"><span>Find out more</span><i class="fa fa-chevron-right" aria-hidden="true"></i></a></div><style> @media (min-width: 992px) and (max-width: 1199px) { [data-module="banner"][data-module-id="61076"].desktop-full-width { background-image: url('https://content.specsavers.com/sib/home/img/banners/desktop-full-small/ES-sun-2022-HomePage-offer-banner-Desktop-full-2400x1000.jpg'); } } @media (min-width: 1200px) { [data-module="banner"][data-module-id="61076"].desktop-full-width { background-image: url('https://content.specsavers.com/sib/home/img/banners/desktop-full-large/ES-sun-2022-HomePage-offer-banner-Desktop-full-3840x1000.jpg'); } } </style></section>`;
	const entry = document.querySelectorAll(".sib-home section")[1];
	entry.insertAdjacentHTML("afterend", markup);

	const banner = document.querySelector(`.${ID}-banner`);
	const cta = banner.querySelector("a.cta-text-chevron");

	cta.addEventListener("click", () => fireEvent("CTA clicked"));

	new IntersectionObserver((i) => {
		if (i[0].isIntersecting) {
			fireEvent("Banner in view");
		}
	}).observe(banner);
};
