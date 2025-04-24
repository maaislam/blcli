/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";
const pages = [
  "en-au/gc/take-the-bite-out-of-failed-payments",
  "en-au/gc/combat-failed-payments",
  "en-au/gc/payments-from-the-future",
  "en-au/gc/talk-about-failed-payments",
  "en-au/gc/i-see-dead-payments",
  "en-au/g/show-me-the-money",
  "en-nz/g/take-the-bite-out-of-failed-payments",
  "en-nz/gc/combat-failed-payments",
  "en-nz/gc/payments-from-the-future",
  "en-nz/gc/talk-about-failed-payments",
  "en-nz/gc/i-see-dead-payments",
  "en-nz/g/show-me-the-mone",
];

const url = window.location.href;

let pageMatched = false;
pages.forEach((slug) => {
  if (url.indexOf(slug) !== -1) pageMatched = true;
});
console.log(pageMatched);
if (pageMatched) {
  pollerLite(["body"], activate);
}
