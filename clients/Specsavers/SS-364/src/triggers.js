/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
  window.navigator.userAgent
);

function selectParagraphByText(text) {
  const paragraphs = document.querySelectorAll("div.container .dev-section p");
  for (let i = 0; i < paragraphs.length; i++) {
    if (paragraphs[i].innerText.includes(text)) {
      return paragraphs[i];
    }
  }
}

const targetTextNode = selectParagraphByText(
  "Across the UK many residents are eligible for an NHS funded eye test and in some cases, may even get a voucher towards the cost of their glasses or contact lenses. If you qualify, you are entitled to an NHS- funded eye test every two years."
);

if (!ieChecks) {
  pollerLite(
    [
      "body",
      () => window.location.pathname.includes("/free-eye-test"),
      () => !!targetTextNode,
      "div.container .dev-section",
    ],
    () => activate(targetTextNode)
  );
}
