/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */

import "@babel/polyfill";
import activate from "./lib/experiment";
import { getCookie, pollerLite } from "../../../../lib/utils";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
  window.navigator.userAgent
);

const isPDP = !!window.location.href.match(/(\d+)[^-]*$/g);

const getData = async () => {
  const res = await fetch(
    "https://blcro.fra1.digitaloceanspaces.com/BO198/lookalikey_all_categories.json"
  );

  return await res.json();
};

getData().then((d) => {
  if (!ieChecks && isPDP) {
    const isValid = Object.keys(d).includes(
      window.location.href.match(/(\d+)[^-]*$/g)[0]
    );

    console.log(window.location.href.match(/(\d+)[^-]*$/g)[0], isValid);

    if (!getCookie("Synthetic_Testing") && isValid) {
      pollerLite(
        [
          "body",
          "#estore_productpage_template_container > .rowContainer > .row",
        ],
        activate(d)
      );
    }
  }
});
