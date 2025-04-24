import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { countdown } from "../../../../../lib/uc-lib";

const { ID, VARIATION } = shared;
export const stepMachines = () => {
  const configuratorLanding = document.querySelector(`#main .configurator-landing`);
  const stepSection = configuratorLanding.querySelector(`.steps_section`);
  const stepMachineText = stepSection.querySelector(`#steps #machines .step_name_text`);
  if (stepMachineText && stepMachineText.textContent == "\nMachines\n") stepMachineText.textContent = "\nColour\n";
  const configuratorCont = configuratorLanding.querySelector(`.configurator-container`);
  const velvetiser = configuratorCont?.querySelector(`.options label[for="velvetiser"]`);
  velvetiser?.click();

  const stepTextMachine = document.querySelector(`#main .steps_section .steps_description .step_description[step-id="machines"] .step_text`);
  const newStepTextMachineText = `Buy the Velvetiser™ <span class="step_discount">£34.95</span> (was £49.95) with a 6 or 12-month Velvetiser Refill Subscription.`;
  stepTextMachine && (stepTextMachine.innerHTML = newStepTextMachineText);

  // const oldDiscount = document.querySelector(`#main .steps_section .steps_description .step_text .step_discount`);
  // const discount = `<span class="step_discount" style="display: inline-block;">£34.95 </span>`;
  // oldDiscount?.insertAdjacentHTML("beforebegin", discount);

  const prodDescPriceAll = configuratorCont?.querySelectorAll(
    `.selection[step-id="machines"] .product-group.visible .product .product-description-wrapper .product-description_price`
  );
  // const delValue = `<del class="outdated-value" style="display: inline-block;">£49.95</del>`;
  // prodDescPriceAll.querySelector(`.outdated-value`)?.insertAdjacentHTML("beforebegin", delValue);
  const offerValue = `<span class="value" style="display: inline-block;">£34.95 <span> </span></span>`;
  // console.log(prodDescPriceAll);
  prodDescPriceAll.length > 0 &&
    prodDescPriceAll.forEach((descPrice) => {
      descPrice.querySelector(`del.outdated-value`) && (descPrice.querySelector(`del.outdated-value`).style.color = "#000");
      if (descPrice.querySelector(`span.value`)) {
        descPrice.querySelector(`span.value`).style.display = "none";
        descPrice.querySelector(`span.value`)?.insertAdjacentHTML("beforebegin", offerValue);
      }
    });

  // const productFooter = ``;
  // const prodDesc = configuratorCont?.querySelector(`.selection.visible .product-group.visible .product-group-content .items.product-with-content .product.active .product-description`);
  // prodDesc?.insertAdjacentHTML("afterend", productFooter);

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
  $(document).ready(function () {
    nextStep &&
      // $(`.selection.visible .product-group.visible .product-group-content .items.product-with-content .product.active .product-description`).append(nextStep);
      $(`.selection.visible .product-group.visible .product-group-content .items.product-with-content`).append(nextStep);

    const accordion = `<div class="${ID}--product-accordion"><div class="acc-container">
    <div class="acc">
      <div class="acc-head">
        <p><span class="text-bold">SAVE £15 today</span>, find out more</p>
      </div>
      <div class="acc-content">
        <p>
          Keep your supply of drinking chocolate topped up, effortlessly, with a 6- or 12-month subscription.** <span class="text-price" style="text-decoration: line-through;">£49.95</span> <span class="text-price">£34.95</span> Limited-time offer. <br>Use code <span class="text-bold">VELV3495</span> at checkout. <br>Offers end Sunday 18th September 2022 
        </p>
      </div>
    </div>
    </div></div>`;
    accordion && $(stepSection).after(accordion);

    $(`.${ID}--product-accordion .acc-head`).on("click", function () {
      if ($(this).hasClass("active")) {
        $(this).siblings(".acc-content").slideUp();
        $(this).removeClass("active");
      } else {
        $(".acc-content").slideUp();
        $(".acc-head").removeClass("active");
        $(this).siblings(".acc-content").slideToggle();
        $(this).toggleClass("active");
        // console.log(`User opens the accordion`);
        fireEvent(`User opens the accordion`);
      }
    });
    const targetNextStepButton = document.querySelector(`.right_container.visible #nextStep`);
    let currentSpan = targetNextStepButton.querySelector(`.next-step-btn.activeStep`).textContent.trim();
    $(targetNextStepButton).on("click", function () {
      //   console.log(`User clicks ${currentSpan}`);
      // window.scrollTo(0, 0);
      const targetTop = $(`.configurator-landing .steps_section`).offset().top - 42;
      // if (currentSpan != "VIEW BAG & CHECKOUT" && $(document).scrollTop() > targetTop) {
      if (currentSpan != "VIEW BAG & CHECKOUT") {
        $("html,body").animate(
          {
            scrollTop: targetTop,
          },
          300
        );
      }
      if ($(`.${ID}--product-accordion .acc-head`).hasClass("active")) {
        $(`.${ID}--product-accordion .acc-head`).siblings(".acc-content").slideUp();
        $(`.${ID}--product-accordion .acc-head`).removeClass("active");
      }
      fireEvent(`User clicks ${currentSpan}`);
      currentSpan = targetNextStepButton.querySelector(`.next-step-btn.activeStep`).textContent.trim();
      // console.log(currentSpan);
    });
    $(`.${ID}--product-continue #nextStep`).on("click", () => {
      targetNextStepButton?.click();
    });
  });
};

// let currentDate = new Date();
// const targetDate = new Date(2022, 8, 18);
// // const targetDate = new Date(2022, 8, 1, 18, 11);
// if (currentDate < targetDate) {
//   //   console.log(currentDate.getDate() - targetDate.getDate());
//   const accordion = `<div class="${ID}--product-accordion"><div class="acc-container">
//       <div class="acc">
//         <div class="acc-head">
//           <p ${
//             currentDate.getDate() - targetDate.getDate() == 0 ? "" : "class='ndd-countdown-hidden'"
//           }>Exclusive Offer ends in <span id="${ID}-ndd-countdown">TIMER LOADING...</span></p>
//         </div>
//         <div class="acc-content">
//           <p>
//             Get your Velvetiser for just <span class="text-price">£34.95</span> (normally <span class="text-price">£49.95</span>) and keep your supply of drinking chocolate topped up, effortlessly, with a 6- or 12-months subscription.** <span style="text-decoration: line-through;">£49.95</span> <span class="text-price">£34.95</span> <br>Limited-time price. <br>Use code <span class="text-bold">VELV3495</span> at checkout. <br>Offers end Sunday 18th September 2022
//           </p>
//         </div>
//       </div>
//       </div></div>`;
//   // accordion && $(`.${ID}--product-continue-accordion`).append(accordion);
//   accordion && $(stepSection).after(accordion);

//   const initCountdown = () => {
//     countdown({
//       cutoff: targetDate,
//       element: `#${ID}-ndd-countdown`,
//       labels: {
//         d: "d",
//         h: "h",
//         m: "m",
//         s: currentDate.getDate() - targetDate.getDate() == 0 ? "s" : "",
//       },
//       zeroPrefixHours: false,
//       zeroPrefixMinutes: false,
//       zeroPrefixSeconds: false,
//       hoursInsteadOfDays: false,
//       delivery: {
//         deliveryDays: null,
//         excludeDays: null,
//         deliveryDayElement: null,
//         tomorrowLabel: false,
//         showFullDate: false,
//         dayLabelStyle: "short",
//         monthLabelStyle: "short",
//       },
//     });
//   };
//   initCountdown();
// }
