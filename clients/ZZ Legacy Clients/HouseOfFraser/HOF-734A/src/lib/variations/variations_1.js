import { card } from "./assets/assets_var_1";
import shared from "../../../../../../core-files/shared";
import { pollerLite } from "../../../../../../lib/utils";

const { ID } = shared;

const hof_734_var_1 = () => {
  const styles = `background-color: #222; color: rgb(234, 246, 102); border: 2px solid rgb(234, 246, 102); padding: 15px; font-size: 28px`;
  console.log("%cVariation 1", styles);

  const imageContainer = document.querySelector(".FlanProdDet .AltProdDet #productImages #productImageContainer");
  imageContainer.insertAdjacentHTML("afterbegin", card);
  pollerLite([`.${ID}-ctc-holder--card`], () => {
    // conditions to show
    document.querySelector(`.${ID}-ctc-holder--card-views`).classList.remove(`${ID}-x--hidden`);

    document.querySelector(`.${ID}-ctc-holder--card-close-button`).addEventListener("click", () => {
      document.querySelector(`.${ID}-ctc-holder--card`).style.display = "none";
    });
  });
};

export default hof_734_var_1;
