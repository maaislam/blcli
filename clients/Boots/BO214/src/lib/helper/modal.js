import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";
import { pollerLite } from "../../../../../../lib/utils";
import { closeBtn, qSVG } from "../assets/svgIcons";
import { modalDomCreator } from "./modalDom";

const { ID, VARIATION } = shared;

export const modalViewAction = (finalData) => {
  if (document.querySelector(`.${ID}-promotional-modal-mainContainer`)) {
    document.querySelector(`.${ID}-promotional-modal-mainContainer`).innerHTML = ``;
  } else {
    if (VARIATION == 1) {
      document.body.insertAdjacentHTML("afterbegin", `<div class="${ID}-promotional-modal-mainContainer"></div>`);
    } else if (VARIATION == 2) {
      document
        .querySelector(`#page div[id$="template_container"]`)
        .insertAdjacentHTML("beforebegin", `<div class="${ID}-promotional-modal-mainContainer"></div>`);
    } else {
      document
        .querySelector(`#oct-notification-sticky .oct-notification__ctas`)
        ?.insertAdjacentHTML("beforebegin", `<div class="${ID}-promotional-modal-mainContainer"></div>`);
    }
  }
  const promotionalModalMainContainer = document.querySelector(`.${ID}-promotional-modal-mainContainer`);
  let { itemCount, offerApplicableItems, shouldShowOffer } = finalData;
  if (offerApplicableItems?.length > 0) {
    if (offerApplicableItems?.length == 3) {
      let aplliedPartNumbers = offerApplicableItems.map((item) => item.partNumber);
      let updatedBasketData = JSON.parse(localStorage.getItem("oldBasketProducts"));
      let updatedOfferApplicableItems = updatedBasketData.filter((newItem) => aplliedPartNumbers.includes(newItem.partNumber));
      if (updatedOfferApplicableItems.length !== 3) {
        let sortedItems = [];
        for (let index = 0; index < updatedOfferApplicableItems.length; index++) {
          for (let j = 0; j < updatedOfferApplicableItems[index].quantity; j++) {
            sortedItems.push(updatedOfferApplicableItems[index]);
          }
        }
        offerApplicableItems = sortedItems;
      } else {
        offerApplicableItems = updatedOfferApplicableItems;
      }

      let isAppliedFound = false;
      for (let i = 0; i < offerApplicableItems.length; i++) {
        if (offerApplicableItems[i].orderItemLevelAppliedPromotions.length > 0) {
          const appliedPromotions = offerApplicableItems[i].orderItemLevelAppliedPromotions;
          //console.log("appliedPromotions", [...appliedPromotions]);
          for (let j = 0; j < appliedPromotions.length; j++) {
            if (appliedPromotions[j].description === "3 for 2 on selected No7 - cheapest free") {
              //console.log("found!", [...offerApplicableItems][i]);
              isAppliedFound = true;
              break;
            }
          }
        }
        if (isAppliedFound) {
          let appliedItem = offerApplicableItems.splice(i, 1);
          console.log(appliedItem);
          offerApplicableItems.push(appliedItem[0]);
          console.log([...offerApplicableItems]);
          break;
        }
      }
    }
    const modalDom = modalDomCreator(offerApplicableItems);
    // console.log("modalDom", modalDom);
    if (itemCount === "Increased" && VARIATION == 1) {
      promotionalModalMainContainer.insertAdjacentHTML("afterbegin", `<div class="${ID}-overlay ${ID}-x--hidden"></div>${modalDom}`);
      setTimeout(() => {
        !promotionalModalMainContainer?.querySelector(`.${ID}-promotional-modal-container`)?.classList.contains(`${ID}-x--animation`) &&
          promotionalModalMainContainer?.querySelector(`.${ID}-promotional-modal-container`)?.classList.add(`${ID}-x--animation`);
      }, 500);
    } else if (VARIATION == 2 || VARIATION == 3) {
      promotionalModalMainContainer.insertAdjacentHTML("afterbegin", modalDom);
    }
    // console.log("%cmodal is available ...", `font-size: 30px; color: green;`);
  }

  if (VARIATION == 2 || VARIATION == 3) {
    pollerLite([() => window.jQuery], () => {
      function clickHandlerAcc() {
        // console.log("User clicks on the mobile banner");
        fireEvent("User clicks on the mobile banner");
        document.querySelector(`.${ID}-angle-right`).classList.toggle("angle-down");
        if ($(this).hasClass("active")) {
          $(this).siblings(".acc-content").slideUp();
          $(this).removeClass("active");
        } else {
          $(".acc-content").slideUp();
          $(".acc-head").removeClass("active");
          $(this).siblings(".acc-content").slideToggle();
          $(this).toggleClass("active");
        }
      }
      $(document).ready(function () {
        const clickOperator = () => {
          if (VARIATION == 2) {
            if ($(window).width() < 1200) {
              !$(`.${ID}-acc-container .acc-head`).hasClass("accordion-active") && $(`.${ID}-acc-container .acc-head`).addClass("accordion-active");
            } else {
              $(`.${ID}-acc-container .acc-head`).removeClass("accordion-active");
            }
          } else {
            !$(`.${ID}-acc-container .acc-head`).hasClass("accordion-active") && $(`.${ID}-acc-container .acc-head`).addClass("accordion-active");
          }
        };
        clickOperator();
        $(document).off("click", `.${ID}-acc-container .acc-head.accordion-active`);
        $(document).on("click", `.${ID}-acc-container .acc-head.accordion-active`, clickHandlerAcc);
        $(window).resize(function () {
          clickOperator();
        });
      });
    });
  }
};
