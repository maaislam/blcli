import shared from "../../../../../../core-files/shared";

const { ID } = shared;
export const nextStepButton = () => {
  const nextStep = `<div class="${ID}--product-continue"><button
    type="button"
    id="nextStep"
    class="button-fancy-medium disabled"
    data-submit-url="/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Configurator-Complete?ID=MachineAndRefills"
  >
    <span class="next-step-btn step-action activeStep" stepbtn-id="machines"> Continue to step 2 </span>
    <span class="next-step-btn step-action" stepbtn-id="refills"> Continue to step 3 </span>
    <span class="next-step-btn step-action" stepbtn-id="addons"> VIEW BAG &amp; CHECKOUT </span>
  </button></div>`;
  nextStep && $(`.selection.visible .product-group.visible .product-group-content .items.product-with-content`).append(nextStep);
};
