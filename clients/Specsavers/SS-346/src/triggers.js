/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
  window.navigator.userAgent
);

if (!ieChecks) {
  pollerLite(
    [
      "body",
      "div.panel-pane.pane-block.pane-unipro-help-faq-unipro-help-faq-most-back-to.pane-unipro-help-faq",
      "div.container.main-content-area",
      "div.search-results--mobile.mobile-answer-faq-column",
      "div.answer.panel.panel-default.panel-body.hidden-xs",
      "div.panel-pane.pane-block.pane-unipro-help-faq-unipro-help-faq-cta-answer-page.book-appointment-panel.pane-unipro-help-faq",
      "div.desktop-faq-column",
      () =>
        window.location.pathname.includes(
          "/help-and-faqs/i-have-booked-an-online-appointment-can-i-amend-it-online"
        ),
    ],
    activate
  );
}
