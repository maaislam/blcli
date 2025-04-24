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

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
	setup();

	if (location.pathname === "/") {
		fireEvent("Conditions Met");
	} else if (
		sessionStorage.getItem(`${ID}-shown`) &&
		sessionStorage.getItem(`${ID}-shown`) == "true"
	) {
		fireEvent("Conditions Met");
	}

	const config = { attributes: false, childList: true, subtree: true };
	pollerLite(['div.main section button[type="submit"]'], () => {
		let nextStepButton = document.querySelector(
			'div.main section button[type="submit"]'
		);
		if (nextStepButton) {
			nextStepButton.addEventListener("click", (e) => {
				const isValueAvailable = sessionStorage.getItem(`${ID}-shown`);
				if (isValueAvailable && isValueAvailable == "true") {
					const section = e.target.closest("section");
					const sectionId = section ? section.getAttribute("id") : "";
					const loc = location.pathname;
					if (sectionId === "introductions") {
						setTimeout(function () {
							if (loc !== location.pathname) {
								fireEvent(
									"Customer completes checkout step 1 (your details)"
								);
								//console.log('Customer completes checkout step 1 (your details)')
							}
						}, 1500);
					} else if (sectionId === "delivery") {
						setTimeout(function () {
							if (loc !== location.pathname) {
								fireEvent(
									"Customer completes checkout step 2 (delivery)"
								);
								//console.log('Customer completes checkout step 2 (delivery)')
							}
						}, 1500);
					}

					if (loc.indexOf("kartendetails") > -1) {
						sessionStorage.setItem(`${ID}-payment-done`, true);
						const triggerEvent = setInterval(() => {
							if (
								location.pathname.indexOf("konto/bestatigung") >
									-1 &&
								sessionStorage.getItem(`${ID}-payment-done`) &&
								sessionStorage.getItem(`${ID}-payment-done`) ===
									"true"
							) {
								fireEvent(
									"Customer completes checkout step 3 (payment)"
								);
								sessionStorage.removeItem(`${ID}-payment-done`);
								clearInterval(triggerEvent);
							}
						}, 1000);

						const totalProductsObserver = new MutationObserver(
							(mutationsList, observer) => {
								if (
									e.target.innerText.trim().toLowerCase() ===
									"anmelden"
								) {
									sessionStorage.removeItem(
										`${ID}-payment-done`
									);
									clearInterval(triggerEvent);
								}
							}
						);
						totalProductsObserver.observe(e.target, config);
					}
				}
			});
		}
	});

	pollerLite(["div.main"], () => {
		if (location.pathname === "/") {
			document.addEventListener("click", (e) => {
				const isValueAvailable = sessionStorage.getItem(`${ID}-shown`);
				if (isValueAvailable && isValueAvailable == "true") {
					const target = e.target;
					if (
						target.matches('button.button[type="button"]') ||
						target.closest('button.button[type="button"]')
					) {
						fireEvent(
							`Customer clicks "${e.target.innerText.trim()}" CTA to start checkout`
						);
					}
				}
			});
		}
	});

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		sessionStorage.setItem(`${ID}-shown`, true);
		return;
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

	const domContent = `<div class="background--paper divider--container" id="${ID}-video-section">
    <div>
      <ul>
        <li class="lg:px-16 xl:px-32 md:flex items-center justify-around">
          <div
            class="divider--container relative top-0 bottom-0 max-w-640 h-full"
          >
            <video
              playsinline=""
              muted="muted"
              autoplay="autoplay"
              loop="loop"
              class="min-w-full min-h-full w-auto h-auto"
            >
              <source
                type="video/mp4"
                src="/media/calendar.ff1569f0.mp4"
              />
            </video>
            <div
              class="divider-paper--bottom visible md:invisible"
            ></div>
          </div>
          <div
            class="divider-white--bottom divider--not-fixed -mt-4 md:hidden"
          ></div>
          <div class="flex flex-col p-4 md:p-8 md:w-1/2">
            <h3 class="sm:text-left text-center">
              Muss ich mir jede Woche frische Blumen liefern lassen?
            </h3>
            <p class="m-0 text-center sm:text-left">
              Nein, da sind wir ganz flexibel! In deinem
              Online-Kalender legst du selbst fest, wann wir dich mit
              einem frischen Strauß beglücken.
            </p>
            <p class="m-0 text-center sm:text-left">
              Du bist zu nichts verpflichtet und kannst deine
              Lieferungen jederzeit kündigen. Der Betrag wird nur
              abgebucht, wenn wir auch tatsächlich Blumen liefern.
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="divider-white--top"></div>
    <div class="divider-white--bottom"></div>
  </div>`;
	pollerLite([".router__container .home-page--trustedShop"], () => {
		const refDom = document.querySelector(
			".router__container .home-page--trustedShop"
		)?.parentNode;
		const isAvailable = document.querySelector(`#${ID}-video-section`);
		if (!isAvailable) {
			refDom?.insertAdjacentHTML("afterend", domContent);

			pollerLite([`#${ID}-video-section`], () => {
				var isFired = false;
				document.addEventListener("scroll", (e) => {
					if (!isFired) {
						const targetDom = document.querySelector(
							`#${ID}-video-section`
						);
						var position = targetDom.getBoundingClientRect();
						if (
							position.top < window.innerHeight / 2 &&
							position.bottom > window.innerHeight / 2
						) {
							fireEvent(
								"Visible - Customer sees the video section"
							);
							sessionStorage.setItem(`${ID}-shown`, true);
							isFired = true;
						}
					}
				});
			});
		}
	});
};
