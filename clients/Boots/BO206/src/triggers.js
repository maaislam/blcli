/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */

import activate from "./lib/experiment";
import { getCookie, pollerLite } from "../../../../lib/utils";
import fetchAlgoliaResults from "./lib/algolia";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
  window.navigator.userAgent
);

const isPDP = !!window.location.href.match(/(\d+)[^-]*$/g);

fetch(
  `https://optimisation-data-projects.nw.r.appspot.com/boots_lookalikey/get_lookalikey?url=${window.location.pathname}`
)
  .then((res) => res.json())
  .then((d) => {
    const recommendedData = Object.keys(d.recs).map((r) =>
      d.recs[r].recommended_algolia_id.toString()
    );

    fetchAlgoliaResults(recommendedData)
      .then((d) => {
        if (!ieChecks && isPDP) {
          if (!getCookie("Synthetic_Testing")) {
            pollerLite(
              [
                "body",
                "#estore_productpage_template_container > .rowContainer > .row",
              ],
              () => activate(d)
            );
          }
        }
      })
      .catch(() => {
        return;
      });
  })
  .catch(() => {
    return;
  });
