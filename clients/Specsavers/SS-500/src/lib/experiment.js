/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";
import svg from "./icons";
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		return;
	}
	if (!document.querySelector("section.why-choose-section")) {
		document.body.classList.add(`${ID}`);

		const options = {
			prevNextButtons: false,
			pageDots: true,
			accessibility: true, //true by default
			autoPlay: false, // advance cells every 3 seconds
			cellAlign: "left",
			contain: true,
			draggable: true,
			imagesLoaded: true,
			setGallerySize: false,
		};
		const headerBanner = document.querySelector(
			".sib-site-section--hearing .sib-banner"
		);

		var whyChooseSectionDom;
		if (VARIATION == 1 || VARIATION == 2) {
			whyChooseSectionDom = `<section class="why-choose-section why-choose-${VARIATION}">
        <div class="wrapper">
            <h3 class="why-choose-heading">Why choose Specsavers Audiologists?</h3>
            <div class="reasons-container">
                <div class="why-choose-carousel-wrapper carousel">
                    <div class="carousel-cell reason-item slide">
                        <div class="slide-content">
                            <div class="reason-icon">
                                <img src="https://blcro.fra1.digitaloceanspaces.com/SS-500%2Fperson.svg" alt="Person Icon">
                            </div>
                            <div class="reason-desc">
                                <p class="reason-headline">
                                    20 years of our Audiology services
                                </p>
                                <a class="why-choose-cta" href="/hearing/hearing-test" label="USP - 20 years of our Audiology services">
                                    <span>Learn more</span>
                                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-cell reason-item slide">
                        <div class="slide-content">
                            <div class="reason-icon">
                                <img src="https://blcro.fra1.digitaloceanspaces.com/SS-500%2Fstar.svg" alt="Star Icon">
                            </div>
                            <div class="reason-desc">
                                <p class="reason-headline">
                                    Best Value Price Promise
                                </p>
                                <a class="why-choose-cta" href="/hearing/hearing-aids/hearing-aid-range" label="USP - Best Value Price Promise">
                                    <span>Learn more</span>
                                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-cell reason-item slide">
                        <div class="slide-content">
                            <div class="reason-icon">
                                <img src="https://blcro.fra1.digitaloceanspaces.com/SS-500%2F100_days.svg" alt="Money Icon">
                            </div>
                            <div class="reason-desc">
                                <p class="reason-headline">
                                    100 Day Money Back Guarantee
                                </p>
                                <a class="why-choose-cta" href="/hearing/offers/clear-price" label="USP - 100 Day Money Back Guarantee">
                                    <span>Learn more</span>
                                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-cell reason-item slide">
                        <div class="slide-content">
                            <div class="reason-icon">
                                <img src="https://blcro.fra1.digitaloceanspaces.com/SS-500%2F4_year_guarantee.svg" alt="Year Icon">
                            </div>
                            <div class="reason-desc">
                                <p class="reason-headline">
                                    Four Year Hearing Aid Warranty
                                </p>
                                <a class="why-choose-cta" href="/hearing/offers/clear-price" label="USP - Four Year Hearing Aid Warranty">
                                    <span>Learn more</span>
                                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
		} else if (VARIATION == 3) {
			whyChooseSectionDom = `<section class="why-choose-section why-choose-${VARIATION}">
        <div class="wrapper">
            <h3 class="why-choose-heading">Why choose Specsavers Audiologists?</h3>
            <div class="reasons-container">
                <div class="why-choose-carousel-wrapper carousel">
                    <div class="carousel-cell reason-item slide">
                        <div class="slide-content">
                            <a class="why-choose-cta" href="/hearing/hearing-test" label="USP - 20 years of our Audiology services">
                                <div class="reason-icon">
                                    <img src="https://blcro.fra1.digitaloceanspaces.com/SS-500%2F1.svg" alt="Person Icon">
                                </div>
                                <div class="reason-desc">
                                    <p class="reason-headline">
                                        20 years of our Audiology services
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="carousel-cell reason-item slide">
                        <div class="slide-content">
                            <a class="why-choose-cta" href="/hearing/hearing-aids/hearing-aid-range" label="USP - Best Value Price Promise">
                                <div class="reason-icon">
                                    <img src="https://blcro.fra1.digitaloceanspaces.com/SS-500%2F4.svg" alt="Star Icon">
                                </div>
                                <div class="reason-desc">
                                    <p class="reason-headline">
                                        Best Value Price Promise
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="carousel-cell reason-item slide">
                        <div class="slide-content">
                            <a class="why-choose-cta" href="/hearing/offers/clear-price" label="USP - 100 Day Money Back Guarantee">
                                <div class="reason-icon">
                                    <img src="https://blcro.fra1.digitaloceanspaces.com/SS-500%2F3.svg" alt="Money Icon">
                                </div>
                                <div class="reason-desc">
                                    <p class="reason-headline">
                                        100 Day Money Back Guarantee
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="carousel-cell reason-item slide">
                        <div class="slide-content">
                            <a class="why-choose-cta" href="/hearing/offers/clear-price" label="USP - Four Year Hearing Aid Warranty">
                                <div class="reason-icon">
                                    <img src="https://blcro.fra1.digitaloceanspaces.com/SS-500%2F2.svg" alt="Year Icon">
                                </div>
                                <div class="reason-desc">
                                    <p class="reason-headline">
                                        Four Year Hearing Aid Warranty
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
		}
		headerBanner.insertAdjacentHTML("afterend", whyChooseSectionDom);
		pollerLite(["section.why-choose-section"], () => {
			var elem = document.querySelector(
				"div.why-choose-carousel-wrapper"
			);
			var slider;
			var isFlickity;
			if (window.innerWidth < 768) {
				slider = new Flickity(elem, options);
				isFlickity = true;
			} else {
				if (isFlickity) {
					slider.destroy();
					isFlickity = !isFlickity;
				}
			}

			window.addEventListener("resize", () => {
				if (window.innerWidth < 768) {
					if (!isFlickity) {
						slider = new Flickity(elem, options);
						isFlickity = true;
					} else {
						slider.resize();
					}
				} else {
					if (isFlickity) {
						slider.destroy();
						isFlickity = !isFlickity;
					}
				}
			});

			const ctas = document.querySelectorAll(
				"section.why-choose-section .why-choose-cta"
			);
			if (ctas.length > 0) {
				ctas.forEach((item) => {
					item.addEventListener("click", () => {
						const label = item.getAttribute("label");
						fireEvent(`Click - ${label.trim()}`);
					});
				});
			}
		});
	}
};
