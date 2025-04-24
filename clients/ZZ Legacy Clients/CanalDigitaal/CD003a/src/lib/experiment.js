/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { events } from "../../../../../lib/utils";
import { setup } from "./services";
import shared from "./shared";

export default () => {
  setup();

  const { ID } = shared;
  const $currentDesc = $("#checkout .checkout-control-bar .step-description");
  const $newDesc = $(
    `<div class="${ID}_button-description-desktop font-14 italic step-description"></div>`
  );
  const $nextBtn = $('#checkout .checkout-control-bar button[name="Next"]');

  const fixTabletSteps = (step) => {
    const $stepsWrapperDesktop = $(
      "#checkout .steps-container > .hidden-sm-down"
    );

    // Desktop
    if ($stepsWrapperDesktop.length > 0) {
      // Fix tablet view issues
      $stepsWrapperDesktop
        .removeClass("hidden-sm-down")
        .addClass("hidden-xs-down")
        .addClass(`${ID}_steps-desktop`);
      $stepsWrapperDesktop
        .find(".hidden-sm-down")
        .removeClass("hidden-sm-down")
        .addClass("hidden-xs-down");
    }
  };

  const updateSteps = () => {
    const $stepsWrapperMobile = $("#checkout .steps-container > .hidden-sm-up");

    // Mobile
    if ($stepsWrapperMobile.length > 0) {
      const $firstStepMobile = $stepsWrapperMobile.children(".step").eq(0);
      const $secondSteMobilep = $stepsWrapperMobile.children(".step").eq(1);
      const $thirdStepMobile = $stepsWrapperMobile.children(".step").eq(2);

      $firstStepMobile.append(
        '<span class="step-text">Persoonlijke gegevens</span>'
      );
      $secondSteMobilep.append('<span class="step-text">Bankrekening</span>');
      $thirdStepMobile.append('<span class="step-text">Overzicht</span>');
    }
  };

  const updateButtons = (step) => {
    console.log($currentDesc);
    if (step === 1) {
      $nextBtn.text("Volgende");
      $currentDesc.attr("data-step", 1);
      $newDesc.attr("data-step", 1);
      $currentDesc.text("Op de volgende pagina vragen we je betaalgegevens.");
      $newDesc.text("Op de volgende pagina vragen we je betaalgegevens.");
    }
    // New step value
    else if (step === 2) {
      // Change button text
      $nextBtn.text("Naar overzicht");
      // Change button label
      $currentDesc.text(
        "Op de volgende pagina kan je je gegevens checken voordat je gratis week start."
      );
      $newDesc.text(
        "Op de volgende pagina kan je je gegevens checken voordat je gratis week start."
      );

      $currentDesc.attr("data-step", 2);
      $newDesc.attr("data-step", 2);
    } else if (step === 3) {
      $nextBtn.text("Volgende");
      $currentDesc.attr("data-step", 3);
      $newDesc.attr("data-step", 3);
      $currentDesc.text(
        "We sturen je per e-mail een verificatiecode om je gratis week direct te starten."
      );
      $newDesc.text(
        "We sturen je per e-mail een verificatiecode om je gratis week direct te starten."
      );
    }
  };

  fixTabletSteps();
  updateSteps();

  // Make sure our changes persist when user goes between checkout steps.
  $nextBtn.addClass(`${ID}_next-button`);
  $nextBtn
    .parents(".col-6")
    .removeClass("col-6 col-md-5")
    .addClass("col-8 col-sm-6 col-xl-5");

  $currentDesc
    .addClass(`${ID}_button-description-mobile`)
    .removeClass("hidden-md-down");

  const btnContext = window.m7.ko.contextFor($nextBtn[0]);
  if (typeof btnContext === "object") {
    // Move the description to be underneath the button so we can centralise it.
    $nextBtn.after($newDesc);

    // Run button updates once on load.
    updateButtons(btnContext.$data.Step());

    // Subscribe to changes of the step
    btnContext.$data.Step.subscribe((step) => {
      updateButtons(step);
    });
  }
};
