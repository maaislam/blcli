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
	document.body.classList.add(`${ID}`);
	const options = {
		prevNextButtons: false,
		pageDots: true,
		accessibility: true, //true by default
		autoPlay: false, // advance cells every 3 seconds
		cellAlign: "left",
		contain: true,
		draggable: true,
	};
	const headerBanner = document.querySelector("section.bg-mono-light");

	var whyChooseSectionDom;
	if (VARIATION == 1) {
		whyChooseSectionDom = `<section class="why-choose-section why-choose-${VARIATION}">
        <div class="wrapper">
            <h3 class="why-choose-heading">Why choose Specsavers?</h3>
            <div class="reasons-container">
                <div class="why-choose-carousel-wrapper carousel">
                    <div class="carousel-cell reason-item slide">
                        <div class="slide-content">
                            <div class="reason-icon">
                                ${svg.store}
                            </div>
                            <div class="reason-desc">
                                <p class="reason-headline">
                                    850 local businesses nationwide
                                </p>
                                <a class="why-choose-cta" href="/stores" label="usp_owned_and_run">
                                    <span>Find your store</span>
                                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-cell reason-item slide">
                        <div class="slide-content">
                            <div class="reason-icon">
                                ${svg.home}
                            </div>
                            <div class="reason-desc">
                                <p class="reason-headline">
                                    Home eye test
                                </p>
                                <a class="why-choose-cta" href="/home-eye-tests/eligibility" label="usp_domicilliary">
                                    <span>Check eligibility</span>
                                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-cell reason-item slide">
                        <div class="slide-content">
                            <div class="reason-icon">
                                ${svg.eye}
                            </div>
                            <div class="reason-desc">
                                <p class="reason-headline">
                                    Our advanced eye tests
                                </p>
                                <a class="why-choose-cta" href="/eye-health/oct-scan" label="usp_octscan">
                                    <span>Find out about OCT</span>
                                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
	} else if (VARIATION == 2) {
		whyChooseSectionDom = `<section class="why-choose-section why-choose-${VARIATION}">
        <div class="wrapper">
            <h3 class="why-choose-heading">Why choose Specsavers?</h3>
            <div class="reasons-container">
                <div class="why-choose-carousel-wrapper carousel">
                    <div class="carousel-cell reason-item slide">
                        <div class="slide-content">
                            <div class="reason-icon">
                                ${svg.store}
                            </div>
                            <div class="reason-desc">
                                <p class="reason-headline">
                                    850 local businesses nationwide
                                </p>
                                <a class="why-choose-cta" href="/stores" label="usp_owned_and_run">
                                    <span>Find your store</span>
                                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-cell reason-item slide">
                        <div class="slide-content">
                            <div class="reason-icon">
                                ${svg.home}
                            </div>
                            <div class="reason-desc">
                                <p class="reason-headline">
                                    Home eye test
                                </p>
                                <a class="why-choose-cta" href="/home-eye-tests/eligibility" label="usp_domicilliary">
                                    <span>Check eligibility</span>
                                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-cell reason-item slide">
                        <div class="slide-content">
                            <div class="reason-icon">
                                ${svg.eye}
                            </div>
                            <div class="reason-desc">
                                <p class="reason-headline">
                                    Our advanced eye tests
                                </p>
                                <a class="why-choose-cta" href="/eye-health/oct-scan" label="usp_octscan">
                                    <span>Find out about OCT</span>
                                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-cell reason-item slide">
                        <div class="slide-content">
                            <div class="reason-icon">
                                ${svg.chat}
                            </div>
                            <div class="reason-desc">
                                <p class="reason-headline">
                                    Expert advisors online
                                </p>
                                <a class="why-choose-cta" href="/help-and-faqs/ask-the-optician" label="usp_asktheexpert">
                                    <span>Live chat</span>
                                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
	}
	headerBanner.insertAdjacentHTML("afterend", whyChooseSectionDom);
	pollerLite(["section.why-choose-section"], () => {
		var elem = document.querySelector("div.why-choose-carousel-wrapper");
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
				slider = new Flickity(elem, options);
				isFlickity = true;
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
};
