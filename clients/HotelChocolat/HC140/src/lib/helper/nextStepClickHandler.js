import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";
import { pollerLite } from "./../../../../../../lib/utils";

const { ID } = shared;
export const nextStepClickHandler = () => {
  pollerLite([`.right_container.visible #nextStep`], () => {
    const targetNextStepButton = document.querySelector(`.right_container.visible #nextStep`);
    $(targetNextStepButton).on("click", function () {
      //   console.log(`User clicks ${currentSpan}`);
      // window.scrollTo(0, 0);
      const currentSpan = targetNextStepButton.querySelector(`.next-step-btn.activeStep`).textContent.trim();
      const targetTop = $(`.configurator-landing .steps_section`).offset().top - 42;
      if (currentSpan != "VIEW BAG & CHECKOUT") {
        $("html,body").animate(
          {
            scrollTop: targetTop,
          },
          300
        );
      }
    });
    $(`.${ID}--product-continue #nextStep`).on("click", () => {
      targetNextStepButton?.click();
    });
  });
};
