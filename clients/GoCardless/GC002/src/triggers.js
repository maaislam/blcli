/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";
import { essentialPanels } from "./lib/dom";

const url = window.location.href;
if (
  url.indexOf("com/gc/take-the-bite-out-of-failed-payments") > -1 ||
  url.indexOf("protegez-vous-des-echecs-de-paiement") > -1 ||
  url.indexOf("zahlungserfolg-ohne-drama") > -1
) {
  pollerLite(essentialPanels, activate);
}
