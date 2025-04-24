/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import Accordion from "./components/Accordion";

const { ID, VARIATION } = shared;

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

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  const HERO_TITLE =
    VARIATION == 1
      ? "How do I amend my appointment?"
      : "Easily change your appointment date and time";

  (function repositionBackLink() {
    const backLink = document.querySelector(
      "div.panel-pane.pane-block.pane-unipro-help-faq-unipro-help-faq-most-back-to.pane-unipro-help-faq"
    ).parentElement;
    const container = document.querySelector("div.container.main-content-area");
    if (backLink && container) {
      container.prepend(backLink);
    }
  })();

  (function removeOldContent() {
    document
      .querySelector("div.search-results--mobile.mobile-answer-faq-column")
      .remove();
    document
      .querySelector("div.answer.panel.panel-default.panel-body.hidden-xs")
      .remove();
    document
      .querySelector(
        "div.panel-pane.pane-block.pane-unipro-help-faq-unipro-help-faq-cta-answer-page.book-appointment-panel.pane-unipro-help-faq"
      )
      .remove();
  })();

  const root = /* html */ `
		<div class="${ID}-root">
			<h1>${HERO_TITLE}</h1>
			<p>Find everything you need to know to amend appointments and rebook for a better time.</p>
			<details>
				<summary icon-email data-content-type="Booking Email">
					<h2>From your booking email</h2>
					<p>For eye tests that have been booked online you’ll find a link to amend your appointment in your booking confirmation email.</p>
					<span class="${ID}-accordion-cross"></span>
				</summary>
				<div class="${ID}-accordion-content">
					<h3>Need help finding the email?</h3>
					<p>You can search your inbox using the ‘from’ email address, or the ‘subject line’ of the email:</p>
					<div class="${ID}-copy-box-content" data-copy-box>
						<p><span>From:</span> <span data-content data-content-type="Email Address">appointment@bookings.specsavers.co.uk</span></p>
						<button>Copy</button>
					</div>
					<div class="${ID}-copy-box-content" data-copy-box>
						<p><span>Subject line:</span> <span data-content data-content-type="Subject Line">Appointment booked</span></p>
						<button>Copy</button>
					</div>
				</div>
			</details>
			<details>
				<summary icon-store data-content-type="Contact the Store">
					<h2>Contact the store</h2>
					<p>Call or visit the store where your appointment is booked and you can make changes to your appointment.</p>
					<span class="${ID}-accordion-cross"></span>
				</summary>
				<div class="${ID}-accordion-content">
					<h3>Store contact details</h3>
					<p>You can find the contact details of the store where your appointment is booked using our store finder.</p>
					<a href="https://www.specsavers.co.uk/stores" class="${ID}-store-cta">Find a store</a>
					<div class="${ID}-warning-box">
						<h3>Hearing appointments</h3>
						<p>Hearing appointments cannot currently be amended online. Please contact the store directly.</p>
					</div>
				</div>
			</details>
			<div class="${ID}-warning-box">
				<h2>Changing appointment type or store?</h2>
				<p>If you wish to change an appointment to a different type of store, the easiest way is to cancel the current appointment and make a new booking.</p>
			</div>
		</div>
	`;

  (function renderExperiment() {
    let entryElement;

    if (window.innerWidth >= 768) {
      entryElement = document.querySelector("div.desktop-faq-column");
    } else {
      entryElement = document.querySelector(
        "div.desktop-faq-column"
      ).parentElement;
    }
    entryElement.insertAdjacentHTML("afterbegin", root);

    const findAStoreCTA = document.querySelector(`.${ID}-store-cta`);
    findAStoreCTA.addEventListener("click", () => {
      fireEvent("Find A Store CTA Clicked");
    });
  })();

  (function setupAccordions() {
    const isSafari =
      navigator.vendor.match(/apple/i) &&
      !navigator.userAgent.match(/crios/i) &&
      !navigator.userAgent.match(/fxios/i) &&
      !navigator.userAgent.match(/Opera|OPT\//);
    if (!isSafari) {
      document.querySelectorAll(`.${ID}-root details`).forEach((el) => {
        new Accordion(el);
      });
    }
  })();

  (function setupCopyClipboardContent() {
    document.querySelectorAll(`.${ID}-copy-box-content`).forEach((el) => {
      const button = el.querySelector("button");

      button.addEventListener("click", () => {
        const text = el.querySelector("span[data-content]");
        navigator.clipboard.writeText(text.textContent);

        button.textContent = "Copied";

        fireEvent(`Clicked copy button on "${text.dataset.contentType}"`);

        setTimeout(() => {
          button.textContent = "Copy";
        }, 2000);
      });
    });
  })();

  (function repositionElementOnResize() {
    window.addEventListener("resize", () => {
      const root = document.querySelector(`.${ID}-root`);
      if (window.innerWidth >= 768) {
        document.querySelector("div.desktop-faq-column").prepend(root);
      } else {
        document
          .querySelector("div.desktop-faq-column")
          .parentElement.prepend(root);
      }
    });
  })();
};
