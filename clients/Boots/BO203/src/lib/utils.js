import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";

const { ID } = shared;

export const removeLoader = (el) => {
  el.querySelector(`.${ID}-loader`).remove();
};

export const loadPerfectBundle = () =>
  new Promise((res) => {
    var versionUpdate = new Date().getTime();
    function loadAssets(incre_fileListToLoad) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = incre_fileListToLoad[0].url;
      script.async = true;
      document.getElementsByTagName("head")[0].appendChild(script);
    }
    var incre_fileListToLoad = [
      {
        url:
          "https://www.increasingly.co/Implementation/bTSx98/js/increasingly_bTSx98.js?v=" +
          versionUpdate,
        type: "js",
      },
    ];
    loadAssets(incre_fileListToLoad);

    pollerLite([".inc_pdp_block"], () => {
      pollerLite(
        [
          () => {
            const textEl = document.querySelector(
              ".inc_pdp_bundle_cart_summary_add_btn_text"
            );
            if (textEl.textContent !== "") return true;
            return false;
          },
        ],
        () => res(document.querySelector(".inc_pdp_block"))
      );
    });
  });
